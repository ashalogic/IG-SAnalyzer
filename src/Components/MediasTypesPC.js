import React from "react";
import { Doughnut } from "react-chartjs-2";

//Set Chart Option & Data structure
var Chart = {
  data: {
    labels: ["Video", "Picture", "Carousel"],
    datasets: [
      {
        data: null,
        backgroundColor: ["#E1306C", "#405DE6", "#F77737"],
        labels: "Medias Types"
      }
    ]
  },
  option: {
    responsive: true,
    title: {
      fontSize: 21,
      display: true,
      text: "Medias Type Doughnut",
      fontFamily: "Righteous"
    },
    tooltips: {
      titleFontFamily: "Righteous"
    },
    legend: {
      position: "right",
      labels: {
        fontFamily: "Righteous"
      }
    }
  }
};

function MediasTypesPC(props) {
  var MTi = 0;
  var MTv = 0;
  var MTc = 0;
  props.data.Medias.edges.forEach(x => {
    switch (x.node.__typename) {
      case "GraphImage":
        MTi++;
        break;
      case "GraphVideo":
        MTv++;
        break;
      case "GraphSidecar":
        MTc++;
        break;
      default:
        break;
    }
  });
  Chart.data.datasets[0].data = [MTi, MTv, MTc];

  return (
    <div
      className="card border-0"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.7)"
      }}
    >
      <div className="card-body">
        <Doughnut
          options={Chart.option}
          data={Chart.data}
          // legend={this.state.legend}
          height={192}
        />
      </div>
    </div>
  );
}
export default MediasTypesPC;
