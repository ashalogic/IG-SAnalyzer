import React from "react";
import { Line } from "react-chartjs-2";

//Set Chart Option & Data structure
var Chart = {
  data: {
    labels: null,
    datasets: [
      {
        label: "Like",
        // fill: false,
        backgroundColor: "rgba(250,126,30,0.4)",
        borderColor: "#fa7e1e",
        data: null,
        yAxisID: "y-axis-1"
      },
      {
        label: "Comment",
        // fill: false,
        backgroundColor: "rgba(214,41,118,0.4)",
        borderColor: "#d62976",
        data: null,
        yAxisID: "y-axis-2"
      }
    ]
  },
  option: {
    responsive: true,
    hoverMode: "index",
    stacked: false,
    title: {
      fontFamily: "Righteous",
      display: false,
      text: "Like & Comment through time"
    },
    legend: {
      labels: {
        fontFamily: "Righteous"
      }
    },
    scales: {
      yAxes: [
        {
          type: "linear",
          display: true,
          position: "left",
          id: "y-axis-1"
        },
        {
          type: "linear",
          display: true,
          position: "right",
          id: "y-axis-2",

          gridLines: {
            drawOnChartArea: false // only want the grid lines for one axis to show up
          }
        }
      ]
    }
  }
};

function LikeCommentBC(props) {
  var Likes = props.data.Medias.edges.map(x => {
    return x.node.edge_media_preview_like.count;
  });
  var Comments = props.data.Medias.edges.map(x => {
    return x.node.edge_media_to_comment.count;
  });
  var Dates = props.data.Medias.edges.map(x => {
    return new Date(
      Number(x.node.taken_at_timestamp + "000")
    ).toLocaleDateString();
  });
  Chart.data.labels = Dates;
  Chart.data.datasets[0].data = Likes;
  Chart.data.datasets[1].data = Comments;

  return (
    <div
      className="card igs-card card-2 border-0"
      style={{
        border: "none",
        // backgroundColor: "#000 !important",
        backgroundColor: "unset",
        backdropFilter: "saturate(80%) blur(4px)"
      }}
    >
      <div className="card-body">
        <Line
          options={Chart.option}
          data={Chart.data}
          //   legend={this.state.legend}
          // height={256}
        />
      </div>
    </div>
  );
}
export default LikeCommentBC;
