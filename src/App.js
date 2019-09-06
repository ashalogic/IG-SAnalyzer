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
    return FetchData("taylorswift").then(x => {
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
      <div
        className="container"
        style={{
          background:
            "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(64,93,230,1) 23%, rgba(88,81,219,1) 29%, rgba(131,58,180,1) 35%, rgba(193,53,132,1) 41%, rgba(225,48,108,1) 47%, rgba(253,29,29,1) 53%, rgba(245,96,64,1) 59%, rgba(247,119,55,1) 65%, rgba(252,175,69,1) 71%, rgba(255,220,128,1) 77%, rgba(255,255,255,1) 100%)",
          backgroundSize: "100% 40px",
          backgroundRepeat: "no-repeat"
        }}
      >
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
          <div className="input-group col-md-6 mx-auto">
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
              <div className="col-md-12 mx-auto">
                <ul class="nav nav-tabs nav-fill nav-igs-pills rounded border-0 Righteous">
                  <li class="nav-item">
                    <NavLink exact className="igs-nav-link" to="/">
                      <i class="fas fa-fingerprint"></i>
                      <br />
                      Fingerprint
                    </NavLink>
                  </li>
                  <li class="nav-item">
                    <NavLink className="igs-nav-link" to="/content">
                      <i class="fas fa-hashtag"></i>
                      <br />
                      Content
                    </NavLink>
                  </li>
                  <li class="nav-item">
                    <NavLink className="igs-nav-link" to="/charts">
                      <i class="fas fa-chart-pie"></i>
                      <br />
                      Analysis
                    </NavLink>
                  </li>
                  <li class="nav-item">
                    <NavLink className="igs-nav-link" to="/diagnoses">
                      <i class="fas fa-diagnoses"></i>
                      <br />
                      Diagnoses
                    </NavLink>
                  </li>
                  <li class="nav-item">
                    <NavLink className="igs-nav-link" to="/analogize">
                      <i class="fas fa-not-equal"></i>
                      <br />
                      Analogize
                    </NavLink>
                  </li>
                  <li class="nav-item">
                    <NavLink className="igs-nav-link" to="/download">
                      <i class="fas fa-cloud-download-alt"></i>
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
              {/* <img
                className="img-fluid align-self-center col-md-5"
                alt="loading"
                src="./loading.png"
              /> */}
              <div className="col-md-8 mx-auto text-center align-self-center mt-2">
                <div className="">
                  <p className="lead">
                    © {new Date().getFullYear()} IGSAnalyzer All Rights Reserved
                  </p>
                </div>
                {/* <img
                  className="w-25"
                  src="https://firelaunchers.com/offers/instagram-follower-magnet-with-plr-upsell/images/illustration_1.png"
                /> */}
                {/* <img
                  className="w-25"
                  src="https://seguidores.online/wp-content/uploads/2019/01/entrar-a-Instagram-sin-c%C3%B3digo-de-verificaci%C3%B3n.png"
                /> */}
                {/* <img
                  className="w-50"
                  src="https://instazood.com/wp-content/uploads/2019/05/Instagram-Marketing-Automation4@2x.png"
                /> */}
                {/* <img
                  className="w-25"
                  src="https://mixtarget.com/wp-content/uploads/2019/06/influencer.png"
                /> */}
                <img
                  className="w-75"
                  src="https://www.geckoboard.com/assets/analysis-guide-illo-4.png"
                />
                <img
                  className="w-25"
                  src="https://getswarm.co/wp-content/uploads/2019/07/175e42060fd8694667a8ae0fc3f6265d-640x600.png "
                />
                {/* <img
                  className="w-100"
                  src="https://cdn.likegrowers.com/wp-content/uploads/2019/05/mobile-footer1.png"
                /> */}
              </div>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}
