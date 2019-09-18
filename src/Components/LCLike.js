import React from "react";
import { Line } from "react-chartjs-2";

function kFormatter(num) {
  return Math.abs(num) > 999
    ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
    : Math.sign(num) * Math.abs(num);
}
var Chart = {
  data: {
    labels: null,
    datasets: [
      {
        data: null,
        fill: false,
        type: "line",
        label: "Like",
        yAxisID: "y-axis-1",
        borderColor: "#E1306C",
        backgroundColor: "rgba(225,48,108,0.4)"
      }
    ]
  },
  option: {
    responsive: true,
    title: {
      fontSize: 21,
      display: true,
      fontFamily: "Righteous",
      text: "Likes Through The Ages"
    },
    legend: {
      display: false
    },
    scales: {
      xAxes: [
        {
          type: "time",
          distribution: "series",
          gridLines: {
            display: false
          }
        }
      ],
      yAxes: [
        {
          position: "left",
          id: "y-axis-1",
          type: "linear",
          display: true,
          gridLines: {
            display: true
          },
          ticks: {
            callback: function(value, index, values) {
              return kFormatter(value);
            }
          }
        }
      ]
    }
  }
};

export default class LCLike extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Chart: Chart
    };

    this.handleLikefillCheckBoxChange = this.handleLikefillCheckBoxChange.bind(
      this
    );
  }

  componentWillUnmount() {}
  componentDidMount() {
    var Likes = this.props.data.Medias.edges.map(x => {
      return x.node.edge_media_preview_like.count;
    });
    var Dates = this.props.data.Medias.edges.map(x => {
      return new Date(Number(x.node.taken_at_timestamp + "000"));
    });

    Chart.data.labels = Dates;
    Chart.data.datasets[0].data = Likes;

    this.setState({ Chart: Chart });
  }

  handleLikefillCheckBoxChange() {
    Chart.data.datasets[0].fill = !Chart.data.datasets[0].fill;
    this.setState({ Chart: Chart });
  }

  render() {
    return (
      <div
        className="card border-0"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.7)"
        }}
      >
        <div className="card-body">
          <div className="d-none d-lg-block">
            <Line
              options={this.state.Chart.option}
              data={this.state.Chart.data}
            />
          </div>
          <div className="d-none d-md-block d-lg-none">
            <Line
              options={this.state.Chart.option}
              data={this.state.Chart.data}
              height="96"
            />
          </div>
          <div className="d-sm-none">
            <Line
              options={this.state.Chart.option}
              data={this.state.Chart.data}
              height="192"
            />
          </div>
          <hr />
          <div class="custom-control custom-switch">
            <input
              onChange={this.handleLikefillCheckBoxChange}
              class="custom-control-input"
              id="LikefillCheckBox"
              type="checkbox"
            />
            <label class="custom-control-label" for="LikefillCheckBox">
              Fill Background
            </label>
          </div>
        </div>
      </div>
    );
  }
}
