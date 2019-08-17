import React from "react";
import { Line, Bar } from "react-chartjs-2";

import "../src/App.css";
import NavBar from "../src/NavBar";
import TitleCard from "../src/TitleCard";
import ProfileCard from "../src/ProfileCard";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      username: "lanadelrey"
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  fetchData(event) {
    fetch("https://www.instagram.com/" + this.state.username + "/?__a=1")
      .then(response => response.json())
      .then(responseJson => {
        var Engs = [];
        var Likes = [];
        var Dates = [];
        var Comments = [];

        const followers_count =
          responseJson.graphql.user.edge_followed_by.count;

        responseJson.graphql.user.edge_owner_to_timeline_media.edges.map(x => {
          Dates.push(x.node.taken_at_timestamp);
          Likes.push(x.node.edge_liked_by.count);
          Engs.push(
            ((x.node.edge_liked_by.count + x.node.edge_media_to_comment.count) /
              followers_count) *
              100
          );
          Comments.push(x.node.edge_media_to_comment.count);
        });

        //Calc TotalEngagement
        var TotalEngagement =
          ((Likes.reduce((a, b) => a + b, 0) +
            Comments.reduce((a, b) => a + b, 0)) /
            12 /
            followers_count) *
          100;

        //Like Comment Per Post Chart
        var LCChart = {
          chartdata: {
            labels: Dates,
            datasets: [
              {
                label: "Like",
                backgroundColor: "rgba(250,126,30,0.4)",
                borderColor: "#fa7e1e",
                data: Likes,
                yAxisID: "y-axis-1"
              },
              {
                label: "Comment",
                backgroundColor: "rgba(214,41,118,0.4)",
                borderColor: "#d62976",
                data: Comments,
                yAxisID: "y-axis-2"
              }
            ]
          },
          chartoption: {
            responsive: true,
            hoverMode: "index",
            stacked: false,
            title: {
              display: true,
              text: "Like & Comment & Engagement through time"
            },
            scales: {
              yAxes: [
                {
                  type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                  display: true,
                  position: "left",
                  id: "y-axis-1"
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

        //Like Comment Eng Per Post Chart
        var LCEChart = {
          chartdata: {
            labels: Dates,
            datasets: [
              {
                type: "bar",
                label: "Like",
                backgroundColor: "rgba(250,126,30,0.4)",
                borderColor: "#fa7e1e",
                data: Likes,
                yAxisID: "y-axis-1"
              },
              {
                type: "bar",
                label: "Comment",
                backgroundColor: "rgba(214,41,118,0.4)",
                borderColor: "#d62976",
                data: Comments,
                yAxisID: "y-axis-1"
              },
              {
                type: "line",
                // fill:false,
                label: "Engagement",
                backgroundColor: "rgba(150,47,191,0.4)",
                borderColor: "#962fbf",
                data: Engs,
                yAxisID: "y-axis-2"
              }
            ]
          },
          chartoption: {
            responsive: true,
            hoverMode: "index",
            stacked: false,
            title: {
              display: true,
              text: "Like & Comment & Engagement through time"
            },
            scales: {
              yAxes: [
                {
                  type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                  display: true,
                  position: "left",
                  id: "y-axis-1"
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

        this.setState(
          {
            isLoading: false,
            LCChart: LCChart,
            LCEChart: LCEChart,
            dataSource: responseJson,
            totaleng: TotalEngagement,
            avglike: Likes.reduce((a, b) => a + b, 0) / 12,
            avgcomment: Comments.reduce((a, b) => a + b, 0) / 12
          },
          function() {}
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  componentDidMount() {
    return this.fetchData();
  }

  render() {
    if (this.state.isLoading) {
      // if (true) {
      return (
        <div className="h-100 container-fluid text-center align-content-center">
          <br />
          <h1 className="text-left">Loading</h1>
          <img
            className="img-fluid mx-auto align-self-center"
            alt="loading"
            src="./loading.png"
          />
        </div>
      );
    }

    return (
      <div className="h-100 col col-md-6 col-lg-6 mx-auto">
        {/* NavBar */}
        <NavBar />
        <br />
        <br />
        <br />
        {/* Title Card */}
        <TitleCard />
        {/* Search Card */}
        <div className="card border-0 shadow mb-4">
          <div className="card-body">
            <div class="input-group">
              {/* <div class="input-group-prepend">
                <span
                  class="input-group-text border-0"
                  style={{
                    backgroundColor: "#343a40",
                    color: "#fcd734"
                  }}
                >
                  @
                </span>
              </div> */}
              <input
                name="username"
                type="text"
                value={this.state.username}
                class="form-control"
                placeholder="Username"
                onChange={this.handleInputChange}
                style={{
                  backgroundColor: "transparent",
                  borderColor: "#000",
                  color: "#000",
                  border: "none",
                  borderRadius: "0",
                  borderBottom: "#000 solid 1px"
                }}
              />
              <div class="input-group-append">
                <button
                  onClick={this.fetchData}
                  class="btn btn-outline-dark"
                  type="button"
                >
                  Fetch
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Profile Card */}
        <ProfileCard
          fullname={this.state.dataSource.graphql.user.full_name}
          picture={this.state.dataSource.graphql.user.profile_pic_url_hd}
          bio={this.state.dataSource.graphql.user.biography}
        />

        {/* Followers / S */}
        <div className="card border-0 shadow mb-4">
          <div className="card-body">
            <div className="row">
              <div className="col text-center">
                <div
                  style={{
                    // filter: "blur(10px)",
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundImage: "url('./kiss.png')",
                    height: "16em"
                  }}
                />
                <img
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Tooltip on top"
                  src="./followers.png"
                  style={{
                    height: "64px",
                    width: "64px",
                    color: "#fff",
                    top: "90px",
                    left: "50%",
                    transform: "translate(-30%, 0%)",
                    position: "absolute"
                  }}
                />
              </div>
              <div className="col text-center align-self-center">
                <blockquote class="blockquote">
                  <h2 class="mb-0">
                    {this.state.dataSource.graphql.user.edge_followed_by.count.toLocaleString(
                      navigator.language,
                      { minimumFractionDigits: 0 }
                    )}
                  </h2>
                  <footer class="blockquote-footer text-dark">Follows</footer>
                </blockquote>
              </div>
            </div>
            <div dir="rtl" className="row" style={{ marginTop: "-80px" }}>
              <div className="col text-center">
                <div
                  style={{
                    // filter: "blur(1px)",
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundImage: "url('./kiss.png')",
                    height: "16em"
                  }}
                />
                <img
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Tooltip on top"
                  src="./follow.png"
                  style={{
                    height: "64px",
                    width: "64px",
                    color: "#fff",
                    top: "90px",
                    left: "50%",
                    transform: "translate(-25%, 0%)",
                    position: "absolute"
                  }}
                />
              </div>
              <div className="col text-center align-self-center" dir="ltr">
                <blockquote class="blockquote">
                  <h2 class="mb-0">
                    {this.state.dataSource.graphql.user.edge_follow.count.toLocaleString(
                      navigator.language,
                      { minimumFractionDigits: 0 }
                    )}
                  </h2>
                  <footer class="blockquote-footer text-dark">Follows</footer>
                </blockquote>
              </div>
            </div>
          </div>
        </div>

        {/* Tiles */}
        <div className="card border-0 shadow">
          <div className="card-body">
            <div className="row text-center">
              <div className="col-6 col-md-4 mb-4">
                <h1>soon</h1>
                <p>Price / post</p>
                <img
                  style={{ width: "64px", height: "64px" }}
                  src="iconmoney.png"
                />
              </div>
              <div className="col-6 col-md-4 mb-4">
                <h1>{this.state.totaleng.toFixed(2)}%</h1>
                <p>Engagement</p>
                <img
                  style={{ width: "64px", height: "64px" }}
                  src="iconengagement.png"
                />
              </div>
              <div className="col-6 col-md-4 mb-4">
                <h1>
                  {parseInt(this.state.avgcomment.toFixed(0)).toLocaleString()}
                </h1>
                <p>Average Comments</p>
                <img
                  style={{ width: "64px", height: "64px" }}
                  src="iconcomment.png"
                />
              </div>
              <div className="col-6 col-md-4 mb-4">
                <h1>
                  {parseInt(this.state.avglike.toFixed(0)).toLocaleString()}
                </h1>
                <p>Average Likes</p>
                <img
                  style={{ width: "64px", height: "64px" }}
                  src="iconlike2.png"
                />
              </div>
              <div className="col-6 col-md-4 mb-4">
                <h2>
                  {this.state.dataSource.graphql.user.edge_owner_to_timeline_media.count.toLocaleString()}
                </h2>
                <p>Uploads</p>
                <img
                  style={{ width: "64px", height: "64px" }}
                  src="iconmedia.png"
                />
              </div>
            </div>
          </div>
        </div>

        <br />
        <div className="row text-center">
          <div className="col">
            <div className="card border-0 shadow">
              <div className="card-body">
                <Line
                  options={this.state.LCChart.chartoption}
                  data={this.state.LCChart.chartdata}
                  legend={this.state.legend}
                  height="256px"
                />
              </div>
            </div>
          </div>
        </div>

        <br />
        <div className="row text-center">
          <div className="col">
            <div className="card border-0 shadow">
              <div className="card-body">
                <Bar
                  options={this.state.LCEChart.chartoption}
                  data={this.state.LCEChart.chartdata}
                  legend={this.state.legend}
                  height="256px"
                />
              </div>
            </div>
          </div>
        </div>
        <br />
      </div>
    );
  }
}
