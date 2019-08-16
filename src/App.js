import React from "react";
import { LineChart, PieChart ,AreaChart } from "react-chartkick";
import "chart.js";
// import Navbar from "./navbar";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartdata: [
        {
          name: "Workout",
          data: { "2017-01-01": 3, "2017-01-02": 4 }
        },
        {
          name: "Call parents",
          data: { "2017-01-01": 5, "2017-01-02": 3 }
        }
      ],
      isLoading: true,
      username: "mileycyrus"
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
        console.log(responseJson);
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson
          },
          function() {}
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  componentDidMount() {
    return fetch("https://www.instagram.com/" + this.state.username + "/?__a=1")
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson
          },
          function() {}
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div className="col-3">
          <div className="row bg-dark">
            <div className="col text-center">
              <br />
              <br />
            </div>
          </div>
          <div className="row">
            <div className="col text-center">
              <br />
              <img alt="loading" src="../images/loading.svg" />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="h-100 col col-md-6 col-lg-6 mx-auto">
        <nav
          class="navbar navbar-light fixed-top shadow-sm"
          style={{
            backdropFilter: "saturate(180%) blur(20px)",
            backgroundColor: "rgba(255,255,255,0.7)"
          }}
        >
          <span class="navbar-brand mb-0 h1">Navbar</span>
        </nav>
        <br />
        <br />
        <div className="card mt-4 border-0 shadow-lg">
          <div className="card-body">
            {/* Profile */}
            <div>
              <br />
              <br />
              <br />
              <div
                className="mx-auto"
                style={{
                  width: "192px",
                  height: "192px",
                  backgroundSize: "cover",
                  backgroundColor: "",
                  backgroundImage:
                    "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%)",
                  filter: "blur(50px)"
                  // WebkitFilter: "saturate(20%) blur(4x0px)"
                }}
              />
              <br />
              <div
                className="text-center"
                style={{
                  left: "50%",
                  position: "absolute",
                  transform: "translate(-50%, 0%)",
                  top: "32px"
                }}
              >
                <div
                  className="rounded-circle mx-auto"
                  style={{
                    boxShadow: "0 0 4pt 3pt rgba(255,255,255,1)",
                    backgroundSize: "cover",
                    backgroundImage:
                      "url('" +
                      this.state.dataSource.graphql.user.profile_pic_url_hd +
                      "')",
                    height: "192px",
                    width: "192px"
                  }}
                />
                <br />
                <h2 style={{ color: "rgba(51,51,51,0.6)" }}>
                  {this.state.dataSource.graphql.user.full_name}
                </h2>
              </div>
              <br />
            </div>
            {/* Bio */}
            <div className="row">
              <div className="col text-center">
                <blockquote class="blockquote">
                  <p class="mb-0">
                    {this.state.dataSource.graphql.user.biography}
                  </p>
                  <footer class="blockquote-footer">
                    {this.state.dataSource.graphql.user.full_name} in{" "}
                    <cite title="Source Title">instagram</cite>
                  </footer>
                </blockquote>
              </div>
            </div>

            <br />

            {/* Engagement */}
            <div className="row">
              <div className="col text-center">
                <h1 className="mb-0">4.41%</h1>
                <p>Engagement</p>
              </div>
            </div>

            {/* Follower/Follow */}
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
                    {this.state.dataSource.graphql.user.edge_followed_by.count}
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
                    transform: "translate(-30%, 0%)",
                    position: "absolute"
                  }}
                />
              </div>
              <div className="col text-center align-self-center" dir="ltr">
                <blockquote class="blockquote">
                  <h2 class="mb-0">
                    {this.state.dataSource.graphql.user.edge_follow.count}
                  </h2>
                  <footer class="blockquote-footer text-dark">Follows</footer>
                </blockquote>
              </div>
            </div>

            <div className="row text-center">
              <div className="col">
                <h2>591,394</h2>
                <p>Average Comments</p>
                <img style={{ width: "64px", height: "64px" }} src="cc.png" />
              </div>
              <div className="col">
                <h2>591,394</h2>
                <p>Average Likes</p>
                <img style={{ width: "64px", height: "64px" }} src="ll.png" />
              </div>
              <div className="col">
                <h2>591,394</h2>
                <p>Uploads</p>
                <img style={{ width: "64px", height: "64px" }} src="uu.png" />
              </div>
            </div>
            <br />
            <div className="row text-center">
              <div className="col">
                <div className="card border-0 shadow">
                  <div className="card-body">
                    <h1>
                      <big>$</big>12,000
                    </h1>
                    <p className="mb-0">per post</p>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <div className="row text-center">
              <div className="col">
                <div className="card border-0 shadow">
                  <div className="card-body">
                    <AreaChart  data={this.state.chartdata} />
                  </div>
                </div>
              </div>
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            {/* TextBox */}
            <div className="row">
              <div className="col">
                <div
                  class="card rounded-0 shadow border-0"
                  style={{
                    backgroundColor: "#fdd835"
                  }}
                >
                  <div class="card-body">
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span
                          class="input-group-text border-0"
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
                        class="form-control"
                        placeholder="Username"
                        onChange={this.handleInputChange}
                        style={{
                          backgroundColor: "transparent",
                          borderColor: "#000",
                          color: "#000"
                        }}
                      />
                      <div class="input-group-append">
                        <button
                          onClick={this.fetchData}
                          class="btn btn-dark"
                          type="button"
                        >
                          Fetch
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br />
          </div>
        </div>
      </div>
    );
  }
}
