import React from "react";
import { Line } from "react-chartjs-2";

//Set Chart Option & Data structure
function kFormatter(num) {
  return Math.abs(num) > 999
    ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
    : Math.sign(num) * Math.abs(num);
}
var Chart = {
  data: {
    labels: null,
    datasets: [
      // {
      //   type: "bar",
      //   data: null,
      //   // fill: false,
      //   label: "Like",
      //   yAxisID: "y-axis-1",
      //   backgroundColor: "rgba(225,48,108,0.4)"
      // },
      {
        type: "line",
        data: null,
        fill: false,
        label: "Like",
        // borderDash: [5, 1],
        yAxisID: "y-axis-1",
        borderColor: "#E1306C",
        backgroundColor: "rgba(225,48,108,0.4)"
      }
      // {
      //   label: "Comment",
      //   // fill: false,
      //   backgroundColor: "rgba(214,41,118,0.4)",
      //   borderColor: "#d62976",
      //   data: null,
      //   yAxisID: "y-axis-2"
      // }
    ]
  },
  option: {
    hoverMode: "index",
    responsive: true,
    stacked: false,
    title: {
      fontSize: 16,
      display: true,
      fontFamily: "Righteous",
      text: "Likes Through The Ages"
    },
    legend: {
      position: "right",
      display: false,
      labels: {
        // boxWidth: 20,
        fontFamily: "Righteous"
      }
    },
    scales: {
      xAxes: [
        {
          type: "time",
          distribution: "series",
          // time: {
          //   displayFormats: {
          //     quarter: "h:mm a"
          //   }
          // },
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
          scaleLabel: {
            display: false,
            labelString: "Like Counts"
          },
          ticks: {
            // Include a dollar sign in the ticks
            callback: function(value, index, values) {
              return kFormatter(value);
              // return "$" + value;
            }
          }
        }
        // {
        //   type: "linear",
        //   display: true,
        //   position: "right",
        //   id: "y-axis-2",

        //   gridLines: {
        //     drawOnChartArea: false // only want the grid lines for one axis to show up
        //   }
        // }
      ]
    }
  }
};

export default class LCCommentsadad extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Chart: Chart
    };

    this.handlefillCheckBoxChange = this.handlefillCheckBoxChange.bind(this);
  }

  componentWillUnmount() {}
  componentDidMount() {
    var Likes = this.props.data.Medias.edges.map(x => {
      return x.node.edge_media_preview_like.count;
    });
    var Comments = this.props.data.Medias.edges.map(x => {
      return x.node.edge_media_to_comment.count;
    });
    var Dates = this.props.data.Medias.edges.map(x => {
      console.log(new Date(Number(x.node.taken_at_timestamp + "000")));
      return new Date(Number(x.node.taken_at_timestamp + "000"));
    });

    Chart.data.labels = Dates;
    Chart.data.datasets[0].data = Likes;
    // Chart.data.datasets[1].data = Likes;
    // Chart.data.datasets[1].data = Comments;

    this.setState({ Chart: Chart });
  }

  handlefillCheckBoxChange() {
    console.log();
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
          <Line
            options={this.state.Chart.option}
            data={this.state.Chart.data}
            //   legend={this.state.legend}
          />
          <hr />
          <div class="custom-control custom-switch">
            <input
              onChange={this.handlefillCheckBoxChange}
              class="custom-control-input"
              id="fillCheckBox"
              type="checkbox"
            />
            <label class="custom-control-label" for="fillCheckBox">
              Fill Background
            </label>
          </div>
        </div>
      </div>
    );
  }
}
