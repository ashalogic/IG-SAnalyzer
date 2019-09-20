import React from "react";
import "./TPDisplay.css";

function normalizes(val, max, min) {
  return (val - min) / (max - min);
}
function convertRange(value, r1, r2) {
  return ((value - r1[0]) * (r2[1] - r2[0])) / (r1[1] - r1[0]) + r2[0];
}
const arrAvg = arr => arr.reduce((a, b) => a + b, 0) / arr.length;
const sumValues = obj => Object.values(obj).reduce((a, b) => a + b);

export default class TPDisplay extends React.Component {
  constructor(props) {
    super(props);

    var Followers = this.props.data.Account.edge_followed_by.count;
    var HEng = [];
    this.props.data.Medias.edges.forEach(x => {
      HEng.push({
        engagement:
          ((x.node.edge_media_preview_like.count +
            x.node.edge_media_to_comment.count) /
            Followers) *
          100,
        url: x.node.display_url
      });
    });
    var Max = Math.max.apply(
      Math,
      HEng.map(function(o) {
        return o.engagement;
      })
    );
    var Min = Math.min.apply(
      Math,
      HEng.map(function(o) {
        return o.engagement;
      })
    );
    var total = 0;
    HEng.forEach(element => {
      total += element.engagement;
    });
    var Avr = total / HEng.length;
    HEng.sort((a, b) => (a.engagement < b.engagement ? 1 : -1));

    var Best = HEng.filter(x => {
      return x.engagement > Avr;
    });
    var Worst = HEng.filter(x => {
      return x.engagement < Avr;
    });
    Worst.sort((a, b) => (a.engagement > b.engagement ? 1 : -1));

    console.log(Avr);
    console.log(Best);
    console.log(Worst);
    this.state = {
      Best: Best,
      Worst: Worst,
      Max: Max,
      Min: Min,
      Avr: Avr
    };
  }

  componentDidMount() {}
  componentWillUnmount() {}

  render() {
    return (
      <div
        className="card border-0"
        style={{ backgroundColor: "rgba(255,255,255,0.7)" }}
      >
        <div className="card-body text-center">
          <div
            // style={{
            //   display: "-ms-flexbox",
            //   display: "flex",
            //   //   -ms-flex-wrap: nowrap,
            //   flexWrap: "nowrap",
            //   paddingBottom: "1rem",
            //   marginTop: "-1px",
            //   overflowX: "auto",
            //   //   textAlign: "center",
            //   whiteSpace: "nowrap",
            //   WebkitOverflowScrolling: "touch"
            // }}
            className="row"
          >
            <div className="col-md-6 mb-2">
              <h4 className="Righteous text-left">
                <i class="fas fa-level-up-alt mr-1"></i>More than average
              </h4>
              <hr />
              {this.state.Best.map((x, index) => (
                <div
                  className=" igtpdisplayimage"
                  data-toggle="tooltip"
                  data-placement="top"
                  data-html="true"
                  data-trigger="click "
                  // title="<span>Love</span><br/><a class='btn btn-light'>View</a>"
                  title={
                    "<span>" +
                    x.engagement.toFixed(2) +
                    "%" +
                    "</span><br/><a class='btn btn-sm btn-outline-light'>Open</a>"
                  }
                  style={{
                    display: "inline-block",
                    verticalAlign: "middle",
                    borderRadius: index === 0 ? 1000 : 0,
                    // borderRadius: index === 0 ? 1000 : 0,
                    // borderRadius: 1000,
                    // filter:
                    //   x.engagement > this.state.Avr
                    //     ? "saturate(100%)"
                    //     : "saturate(0%)",
                    // boxShadow:
                    //   x.engagement > this.state.Avr
                    //     ? "0 0 0pt 2pt rgba(0,255,0,0.7)"
                    //     : "0 0 0pt 2pt rgba(255,0,0,0.7)",
                    // border:
                    //   x.engagement > this.state.Avr
                    //     ? "solid 4px rgba(0,255,0,0.7)"
                    //     : "solid 4px rgba(2550,0 ,0,0.7)",
                    height: index === 0 ? 192 : 96,
                    width: index === 0 ? 192 : 96,
                    // height: 96,
                    // width: 96,
                    // margin: "4px",
                    margin: index === 0 ? "8px" : "4px",
                    // border:
                    //   convertRange(
                    //     x.engagement,
                    //     [this.state.Min, this.state.Max],
                    //     [64, 0]
                    //   ) + "px solid rgba(255,255,255,0.7)",
                    // height: convertRange(
                    //   x.engagement,
                    //   [this.state.Min, this.state.Max],
                    //   [32, 128]
                    // ),
                    // width: convertRange(
                    //   x.engagement,
                    //   [this.state.Min, this.state.Max],
                    //   [32, 128]
                    // ),
                    backgroundSize: "cover",
                    backgroundImage: "url('" + x.url + "')"
                    // opacity: convertRange(
                    //   x.engagement,
                    //   [this.state.Min, this.state.Max],
                    //   [0.4, 1]
                    // )
                  }}
                ></div>
              ))}
            </div>
            <div className="col-md-6 text-sm-center">
              <h4 className="Righteous text-left">
                <i class="fas fa-level-down-alt mr-1"></i>Less than average
              </h4>
              <hr />
              {this.state.Worst.map((x, index) => (
                <div
                  className=" igtpdisplayimage"
                  data-toggle="tooltip"
                  data-placement="top"
                  data-html="true"
                  data-trigger="click "
                  // title="<span>Love</span><br/><a class='btn btn-light'>View</a>"
                  title={
                    "<span>" +
                    x.engagement.toFixed(2) +
                    "%" +
                    "</span><br/><a class='btn btn-sm btn-outline-light'>Open</a>"
                  }
                  style={{
                    display: "inline-block",
                    verticalAlign: "middle",
                    filter: "saturate(0%)",
                    borderRadius: index === 0 ? 1000 : 0,
                    height: index === 0 ? 192 : 96,
                    width: index === 0 ? 192 : 96,
                    // height: 96,
                    // width: 96,
                    // margin: "4px",
                    margin: index === 0 ? "8px" : "4px",
                    backgroundSize: "cover",
                    backgroundImage: "url('" + x.url + "')"
                    // opacity: convertRange(
                    //   x.engagement,
                    //   [this.state.Min, this.state.Max],
                    //   [0.4, 1]
                    // )
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
