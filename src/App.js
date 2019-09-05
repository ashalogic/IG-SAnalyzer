import "./App.css";
import React, { Profiler } from "react";
// import NavBar from "./Cards/NavBar";
import { FetchData } from "./Instagram.js";

import Charts from "./Routes/Charts";
import Diagnoses from "./Routes/Diagnoses";
import Fingerprint from "./Routes/Fingerprint";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import Content from "./Routes/Content";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      username: "golfarahani"
    };

    // this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.usernametextInput = React.createRef();
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleClick(event) {
    this.setState({ InAppisLoading: true });
    FetchData(String(this.usernametextInput.current.value)).then(x => {
      this.setState({ InAppisLoading: false, Result: x });
    });
  }

  componentDidMount() {
    return FetchData("instagram").then(x => {
      this.setState({ isLoading: false, Result: x }, function() {});
      // console.log("WOW")
    });
  }

  render() {
    if (this.state.isLoading) {
      // if (true) {
      // if (false) {
      return (
        <div
          style={{ backgroundColor: "#e3e3e3" }}
          className="h-100 container-fluid text-center align-content-center"
        >
          <br />
          <div class="spinner-grow text-primary" role="status">
            <span class="sr-only">Loading...</span>
          </div>
          <br />
          {/* <h1 className="text-left">Loading</h1> */}
          <img
            className="img-fluid mx-auto align-self-center col-md-5"
            alt="loading"
            src="./loading.png"
          />
        </div>
      );
    }
    return (
      // <div className="col-12 col-sm-12 col-md-11 mx-auto">
      <div className="container">
        {/* <NavBar /> */}
        <nav className="p-3 scrolling-navbar fixed-top navbar-style text-center">
          <ul class="nav justify-content-center text-center Righteous">
            <li class="nav-item">
              <a class="nav-link" style={{ color: "#545b62" }} href="#">
                Home
              </a>
            </li>
            <span
              className="h3 Lobster text-center"
              style={{ color: "#E1306C" }}
            >
              IGSAnalyzer
            </span>
            <li class="nav-item">
              <a class="nav-link" style={{ color: "#545b62" }} href="#">
                About
              </a>
            </li>
          </ul>
          <div className="input-group container">
            <div className="input-group-prepend">
              <span
                className="input-group-text border-0"
                style={{
                  backgroundColor: "unset",
                  color: "#000"
                }}
              >
                <i class="fas fa-at"></i>
              </span>
            </div>
            <input
              // name="username"
              type="text"
              // value={this.state.username}
              className="form-control"
              placeholder="Username"
              // onChange={this.handleInputChange}
              style={{
                backgroundColor: "transparent",
                borderColor: "#000",
                color: "#000",
                border: "none",
                borderRadius: "0",
                borderBottom: "#000 solid 1px"
              }}
              ref={this.usernametextInput}
            />
            <div className="input-group-append">
              <button
                onClick={this.handleClick}
                className="btn btn-outline-dark"
                type="button"
              >
                <span
                  style={{
                    display: this.state.InAppisLoading ? "" : "none"
                  }}
                  class="spinner-border spinner-border-sm mr-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Fetch
              </button>
            </div>
          </div>
        </nav>
        <br />
        <br />
        <br />
        <br />
        <br />
        <Router>
          <div
            className=""
            // style={{ backgroundImage: "url('./email-pattern.png')" }}
          >
            <div className="row nav-scroller">
              <div className="col mx-auto">
                <ul class="nav nav-tabs nav-fill nav-igs-pills rounded border-0 Righteous">
                  <li class="nav-item">
                    <NavLink exact className="igs-nav-link" to="/">
                      <i class="fas fa-fingerprint fa-2x"></i>
                      <br />
                      Fingerprint
                    </NavLink>
                  </li>
                  <li class="nav-item">
                    <NavLink className="igs-nav-link" to="/content">
                      <i class="fas fa-hashtag fa-2x"></i>
                      <br />
                      Content
                    </NavLink>
                  </li>
                  <li class="nav-item">
                    <NavLink className="igs-nav-link" to="/charts">
                      <i class="fas fa-chart-pie fa-2x"></i>
                      <br />
                      Analysis
                    </NavLink>
                  </li>
                  <li class="nav-item">
                    <NavLink className="igs-nav-link" to="/diagnoses">
                      <i class="fas fa-diagnoses fa-2x"></i>
                      <br />
                      Diagnoses
                    </NavLink>
                  </li>
                  <li class="nav-item">
                    <NavLink className="igs-nav-link" to="/download">
                      <i class="fas fa-cloud-download-alt fa-2x"></i>
                      <br />
                      Download
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
            <Route
              path="/"
              exact
              component={props => (
                <Fingerprint {...props} Result={this.state.Result} />
              )}
            />
            <Route
              path="/charts"
              Result={this.state.Result}
              component={props => (
                <Charts {...props} Result={this.state.Result} />
              )}
            />
            <Route
              path="/content"
              Result={this.state.Result}
              component={props => (
                <Content {...props} Result={this.state.Result} />
              )}
            />
            <Route
              path="/diagnoses/"
              Result={this.state.Result}
              component={props => (
                <Diagnoses {...props} Result={this.state.Result} />
              )}
            />
            <div className="row">
              <img
                className="img-fluid align-self-center col-md-5"
                alt="loading"
                src="./loading.png"
              />
              <div className="col-md-6 mx-auto text-center align-self-center mt-2 mb-4">
                <div className="">
                  
                  <p className="lead">© {new Date().getFullYear()} IGSAnalyzer All Rights Reserved</p>
                </div>
              </div>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}
