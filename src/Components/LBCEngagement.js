import React from "react";
import { Bar } from "react-chartjs-2";

var Chart = {
  data: {
    labels: null,
    datasets: [
      {
        data: null,
        fill: false,
        type: "line",
        label: "Line",
        yAxisID: "y-axis-1",
        borderColor: "#F77737",
        backgroundColor: "rgba(247,119,55,0.9)"
      },
      {
        data: null,
        fill: false,
        type: "bar",
        label: "Bar",
        yAxisID: "y-axis-1",
        borderColor: "#FCAF45",
        backgroundColor: "rgba(252,175,69,0.9)"
      }
    ]
  },
  option: {
    responsive: true,
    title: {
      fontSize: 21,
      display: true,
      fontFamily: "Righteous",
      text: "Engagement Through The Ages"
    },
    legend: {
      position: "top",
      display: true
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
              return value + " %";
            }
          }
        }
      ]
    }
  }
};

export default class LBCEngagement extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Chart: Chart
    };

    // this.handleCommentfillCheckBoxChange = this.handleCommentfillCheckBoxChange.bind(
    //   this
    // );
  }

  componentWillUnmount() {}
  componentDidMount() {
    var Followers = this.props.data.Account.edge_followed_by.count;
    var Engagements = this.props.data.Medias.edges.map(x => {
      return (
        ((x.node.edge_media_preview_like.count +
          x.node.edge_media_to_comment.count) /
          Followers) *
        100
      );
    });
    var Dates = this.props.data.Medias.edges.map(x => {
      return new Date(Number(x.node.taken_at_timestamp + "000"));
    });
    Chart.data.labels = Dates;
    Chart.data.datasets[0].data = Engagements;
    Chart.data.datasets[1].data = Engagements;

    this.setState({ Chart: Chart });
  }

  // handleCommentfillCheckBoxChange() {
  //   Chart.data.datasets[0].fill = !Chart.data.datasets[0].fill;
  //   this.setState({ Chart: Chart });
  // }

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
            <Bar
              options={this.state.Chart.option}
              data={this.state.Chart.data}
              height="96"
            />
          </div>
          <div className="d-none d-md-block d-lg-none">
            <Bar
              options={this.state.Chart.option}
              data={this.state.Chart.data}
              height="96"
            />
          </div>
          <div className="d-md-none">
            <Bar
              options={this.state.Chart.option}
              data={this.state.Chart.data}
              height="192"
            />
          </div>
          {/* <hr />
          <div class="custom-control custom-switch">
            <input
              onChange={this.handleCommentfillCheckBoxChange}
              class="custom-control-input"
              id="CommentfillCheckBox"
              type="checkbox"
            />
            <label class="custom-control-label" for="CommentfillCheckBox">
              Fill Background
            </label>
          </div> */}
        </div>
      </div>
    );
  }
}
