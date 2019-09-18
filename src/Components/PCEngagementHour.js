import React from "react";
import { Radar } from "react-chartjs-2";

//Set Chart Option & Data structure
var Chart = {
  data: {
    labels: [],
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: "rgba(252,175,69,0.7)",
        borderColor: "#FCAF45",
        pointBackgroundColor: "#F77737",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(179,181,198,1)",
        data: null
      }
    ]
  },
  option: {
    responsive: true,
    title: {
      fontSize: 21,
      display: true,
      text: "Impression Clock",
      fontFamily: "Righteous"
    },
    tooltips: {
      titleFontFamily: "Righteous"
    },
    legend: {
      position: "right",
      display: false,
      labels: {
        fontFamily: "Righteous"
      }
    }
  }
};

export default function PCEngagementHour(props) {
  var Followers = props.data.Account.edge_followed_by.count;
  var HEng = [];
  props.data.Medias.edges.forEach(x => {
    HEng.push({
      engagement:
        ((x.node.edge_media_preview_like.count +
          x.node.edge_media_to_comment.count) /
          Followers) *
        100,
      hour: new Date(Number(x.node.taken_at_timestamp + "000")).getHours()
    });
  });

  var HEngs = {};
  HEng.forEach(function(key) {
    var eng = key.engagement;
    var hour = key.hour;
    if (HEngs.hasOwnProperty(hour)) {
      HEngs[hour] = (HEngs[hour] + eng) / 2;
    } else {
      HEngs[hour] = eng;
    }
  });

  Chart.data.labels = Object.keys(HEngs);
  Chart.data.datasets[0].data = Object.values(HEngs);

  return (
    <div
      className="card border-0"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.7)"
      }}
    >
      <div className="card-body">
        <Radar
          options={Chart.option}
          data={Chart.data}
          // legend={this.state.legend}
          height={192}
        />
      </div>
    </div>
  );
}
