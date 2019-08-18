import React from "react";
import ReactWordcloud from "react-wordcloud";
import { Line, Bar, Pie } from "react-chartjs-2";

import "./App.css";

import NavBar from "./Cards/NavBar";
import TitleCard from "./Cards/TitleCard";
// import ProfileCard from "./Cards/ProfileCard";
import ProfileCardGlass from "./Cards/ProfileCardGlass";
import FeatureCard from "./Cards/FeatureCard";

import { ResponsiveCalendarCanvas } from "@nivo/calendar";

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
        var CalenderChartData = [];
        var MTv = 0;
        var MTi = 0;
        var MTc = 0;
        var words = [];

        const followers_count =
          responseJson.graphql.user.edge_followed_by.count;

        responseJson.graphql.user.edge_owner_to_timeline_media.edges.map(x => {
          if (x.node.edge_media_to_caption.edges[0] !== undefined) {
            String(x.node.edge_media_to_caption.edges[0].node.text)
              .split(" ")
              .forEach(w => {
                words.push(w);
              });
          }

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

          //Dates
          var d = new Date(Number(x.node.taken_at_timestamp + "000"));
          var mm = String(d.getMonth()).padStart(2, "0");
          var dd = String(d.getDate()).padStart(2, "0");
          var yy = d.getFullYear();

          //Engs
          var e =
            ((x.node.edge_liked_by.count + x.node.edge_media_to_comment.count) /
              followers_count) *
            100;

          Dates.push(d.toLocaleDateString());
          Engs.push(e);

          Likes.push(x.node.edge_liked_by.count);
          Comments.push(x.node.edge_media_to_comment.count);

          CalenderChartData.push({
            day: yy + "-" + mm + "-" + dd,
            value: e
          });
          return null;
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
              text: "Like & Comment through time"
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
                fill: false,
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

        //Like Comment Eng Per Post Chart
        var MTPChart = {
          chartdata: {
            labels: ["Video", "Picture", "Carousel"],
            datasets: [
              {
                data: [MTi, MTv, MTc],
                backgroundColor: ["#E1306C", "#405DE6", "#F77737"],
                labels: "Media Type"
              }
            ]
          },
          chartoption: {
            responsive: true
          }
        };

        const distinct = (value, index, self) => {
          return self.indexOf(value) === index;
        };

        console.log(words.filter(distinct));
        var wordss = [
          {
            text: "told",
            value: 64
          },
          {
            text: "mistake",
            value: 11
          },
          {
            text: "thought",
            value: 16
          },
          {
            text: "bad",
            value: 17
          },
          {
            text: "correct",
            value: 10
          },
          {
            text: "day",
            value: 54
          },
          {
            text: "prescription",
            value: 12
          },
          {
            text: "time",
            value: 77
          },
          {
            text: "thing",
            value: 45
          }
        ];
        this.setState(
          {
            isLoading: false,
            LCChart: LCChart,
            LCEChart: LCEChart,
            MTPChart: MTPChart,
            // words: words.filter(distinct),
            words: wordss,
            CalenderChartData: CalenderChartData,
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
      <div className="container">
        <NavBar />
        <br />
        <br />
        <br />
        <div className="row">
          <div className="col-md-4">
            <ProfileCardGlass
              fullname={this.state.dataSource.graphql.user.full_name}
              picture={this.state.dataSource.graphql.user.profile_pic_url_hd}
              bio={this.state.dataSource.graphql.user.biography}
            />
            <TitleCard />
          </div>
          <div className="col-md-8">
            <div className="row">
              <div className="col-6 col-md-6">
                <FeatureCard
                  icon="iconmoney.png"
                  title="Value"
                  value="$52,200"
                  bgcolor="#405DE6"
                  kir={this.state.dataSource.graphql.user.profile_pic_url_hd}
                />
              </div>
              <div className="col-6 col-md-6">
                <FeatureCard
                  icon="iconengagement.png"
                  title="Engagement"
                  value={this.state.totaleng.toFixed(2) + "%"}
                  kir={this.state.dataSource.graphql.user.profile_pic_url_hd}
                  bgcolor="#833AB4"
                />
              </div>
              <div className="col-6 col-md-6">
                <FeatureCard
                  icon="iconmoney.png"
                  title="Avr Comments"
                  value={parseInt(
                    this.state.avgcomment.toFixed(0)
                  ).toLocaleString()}
                  kir={this.state.dataSource.graphql.user.profile_pic_url_hd}
                  bgcolor="#E1306C"
                />
              </div>
              <div className="col-6 col-md-6">
                <FeatureCard
                  icon="iconlike2.png"
                  title="Avr Likes"
                  value={parseInt(
                    this.state.avglike.toFixed(0)
                  ).toLocaleString()}
                  kir={this.state.dataSource.graphql.user.profile_pic_url_hd}
                  bgcolor="#FFDC80"
                />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card card-2 border-0">
              <div className="card-body">
                <Line
                  options={this.state.LCChart.chartoption}
                  data={this.state.LCChart.chartdata}
                  legend={this.state.legend}
                  height={192}
                />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card card-2 border-0">
              <div className="card-body">
                <Bar
                  options={this.state.LCEChart.chartoption}
                  data={this.state.LCEChart.chartdata}
                  legend={this.state.legend}
                  height={192}
                />
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="card card-2 border-0 mt-4">
              <div className="card-body" style={{ height: "192px" }}>
                <ResponsiveCalendarCanvas
                  data={this.state.CalenderChartData}
                  from={this.state.CalenderChartData[0].day}
                  to={this.state.CalenderChartData[11].day}
                  emptyColor="#eeeeee"
                  colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
                  margin={{ top: 20, right: 40, bottom: 20, left: 40 }}
                  yearSpacing={10}
                  monthBorderColor="#ffffff"
                  dayBorderWidth={2}
                  dayBorderColor="#ffffff"
                  legends={[
                    {
                      anchor: "bottom-right",
                      direction: "row",
                      translateY: 32,
                      itemCount: 4,
                      itemWidth: 42,
                      itemHeight: 36,
                      itemsSpacing: 14,
                      itemDirection: "right-to-left"
                    }
                  ]}
                />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card card-2 border-0 mt-4">
              <div className="card-body">
                <Pie
                  options={this.state.MTPChart.chartoption}
                  data={this.state.MTPChart.chartdata}
                  legend={this.state.legend}
                  height={192}
                />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card card-2 border-0 mt-4">
              <div className="card-body">
                <ReactWordcloud words={this.state.words} />
              </div>
            </div>
          </div>
        </div>

        {/* NavBar */}

        {/* Title Card */}
        {/* Search Card */}
        {/* <div className="card border-0 shadow mb-4">
          <div className="card-body">
            <div className="input-group">
              <div className="input-group-prepend">
                <span
                  className="input-group-text border-0"
                  style={{
                    backgroundColor: "#343a40",
                    color: "#fcd734"
                  }}
                >
                  @
                </span>
              </div>
              <input
                name="username"
                type="text"
                value={this.state.username}
                className="form-control"
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
              <div className="input-group-append">
                <button
                  onClick={this.fetchData}
                  className="btn btn-outline-dark"
                  type="button"
                >
                  Fetch
                </button>
              </div>
            </div>
          </div>
        </div> */}
        {/* Profile Card */}
        {/* <ProfileCard
          fullname={this.state.dataSource.graphql.user.full_name}
          picture={this.state.dataSource.graphql.user.profile_pic_url_hd}
          bio={this.state.dataSource.graphql.user.biography}
        /> */}

        <br />
        <br />
        <br />
        <br />
        <br />
        {/* <ProfileCardGlass /> */}

        {/* Followers / S */}

        {/* Tiles */}

        {/* <br />
        <div className="row text-center">
          <div className="col">
            
          </div>
        </div>

        <br />
        <div className="row text-center">
          <div className="col">
            <div className="card border-0 shadow">
              <div className="card-body">
                
              </div>
            </div>
          </div>
        </div>
        <br /> */}
      </div>
    );
  }
}
