import React from "react";
import { Bar } from "react-chartjs-2";

//Set Chart Option & Data structure
var Chart = {
  data: {
    labels: null,
    datasets: [
      {
        type: "bar",
        label: "Like",
        backgroundColor: "rgba(250,126,30,0.4)",
        borderColor: "#fa7e1e",
        data: null,
        yAxisID: "y-axis-1"
      },
      {
        type: "bar",
        label: "Comment",
        backgroundColor: "rgba(214,41,118,0.4)",
        borderColor: "#d62976",
        data: null,
        yAxisID: "y-axis-1"
      },
      {
        type: "line",
        fill: false,
        label: "Engagement",
        backgroundColor: "rgba(150,47,191,0.4)",
        borderColor: "#962fbf",
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
      text: "Like & Comment & Engagement through time"
    },
    legend: {
      labels: {
        fontFamily: "Righteous"
      }
    },
    scales: {
      yAxes: [
        {
          type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
          display: true,
          position: "left",
          id: "y-axis-1",

          // grid line settings
          gridLines: {
            drawOnChartArea: false // only want the grid lines for one axis to show up
          }
        },
        {
          type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
          display: true,
          position: "right",
          id: "y-axis-2",

          // grid line settings
          gridLines: {
            drawOnChartArea: false // only want the grid lines for one axis to show up
          }
        }
      ]
    }
  }
};

function LikeCommentEngagementBLC(props) {
  var Followers = props.data.Account.edge_followed_by.count;
  var Likes = props.data.Medias.edges.map(x => {
    return x.node.edge_media_preview_like.count;
  });
  var Comments = props.data.Medias.edges.map(x => {
    return x.node.edge_media_to_comment.count;
  });
  var Engagements = props.data.Medias.edges.map(x => {
    return (
      ((x.node.edge_media_preview_like.count +
        x.node.edge_media_to_comment.count) /
        Followers) *
      100
    );
  });
  var Dates = props.data.Medias.edges.map(x => {
    return new Date(
      Number(x.node.taken_at_timestamp + "000")
    ).toLocaleDateString();
  });
  Chart.data.labels = Dates;
  Chart.data.datasets[0].data = Likes;
  Chart.data.datasets[1].data = Comments;
  Chart.data.datasets[2].data = Engagements;

  return (
    <div
      className="card igs-card card-2 border-0"
      style={{
        border: "none",
        backgroundColor: "unset",
        backdropFilter: "saturate(80%) blur(4px)"
      }}
    >
      <div className="card-body">
        <Bar
          options={Chart.option}
          data={Chart.data}
          // legend={Chart.data}
          // height={256}
        />
      </div>
    </div>
  );
}
export default LikeCommentEngagementBLC;
