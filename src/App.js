import "./App.css";
import React from "react";
// import NavBar from "./Cards/NavBar";
import { FetchData } from "./Instagram.js";

import Charts from "./Routes/Charts";
import Content from "./Routes/Content";
import Download from "./Routes/Download";
import Diagnoses from "./Routes/Diagnoses";
import Analogize from "./Routes/Analogize";
import Fingerprint from "./Routes/Fingerprint";

import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      installButton: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.usernametextInput = React.createRef();
  }

  handleClick(event) {
    this.setState({ InAppisLoading: true });
    FetchData(String(this.usernametextInput.current.value)).then(x => {
      this.setState({ InAppisLoading: false, Result: x });
    });
  }

  installPrompt = null;
  componentDidMount() {
    FetchData("lanadelrey").then(x => {
      this.setState({ isLoading: false, Result: x }, function() {});
    });

    console.log("Listening for Install prompt");
    window.addEventListener("beforeinstallprompt", e => {
      // For older browsers
      e.preventDefault();
      console.log("Install Prompt fired");
      this.installPrompt = e;
      // See if the app is already installed, in that case, do nothing
      if (
        (window.matchMedia &&
          window.matchMedia("(display-mode: standalone)").matches) ||
        window.navigator.standalone === true
      ) {
        return false;
      }
      // Set the state variable to make button visible
      this.setState({
        installButton: true
      });
    });
  }
  installApp = async () => {
    if (!this.installPrompt) return false;
    this.installPrompt.prompt();
    let outcome = await this.installPrompt.userChoice;
    if (outcome.outcome === "accepted") {
      console.log("App Installed");
    } else {
      console.log("App not installed");
    }
    // Remove the event reference
    this.installPrompt = null;
    // Hide the button
    this.setState({
      installButton: false
    });
  };

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
          <div className="spinner-grow text-primary" role="status">
            <span className="sr-only">Loading...</span>
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
        <nav
          style={{ zIndex: 2000 }}
          className="p-3 scrolling-navbar fixed-top navbar-style text-center"
        >
          <ul className="nav justify-content-center text-center Righteous">
            <li className="nav-item">
              <a
                className="nav-link"
                style={{ color: "#545b62" }}
                href="https://github.com/ashalogic"
              >
                About
              </a>
            </li>
            <span
              className="h3 Lobster text-center"
              style={{ color: "#E1306C" }}
            >
              IGSAnalyzer
            </span>
            <li className="nav-item">
              <a
                alt="source"
                className="nav-link"
                style={{ color: "#545b62" }}
                href="https://github.com/ashalogic/IG-SAnalyzer"
              >
                Source
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
                <i className="fas fa-at"></i>
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
                  className="spinner-border spinner-border-sm mr-2"
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
          <div>
            <div
              id="notificationmsg"
              style={{ display: "none" }}
              class="alert alert-info text-center"
              role="alert"
            >
              New Update available! Reload the webapp to see the latest juicy
              changes.
            </div>
            <div className="row nav-scroller">
              <div className="col-md-12 mx-auto">
                <ul className="nav nav-tabs nav-fill nav-igs-pills rounded border-0 Righteous">
                  <li className="nav-item">
                    <NavLink exact className="igs-nav-link" to="/">
                      <i className="fas fa-fingerprint"></i>
                      <br />
                      Fingerprint
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="igs-nav-link" to="/content">
                      <i className="fas fa-hashtag"></i>
                      <br />
                      Content
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="igs-nav-link" to="/charts">
                      <i className="fas fa-chart-pie"></i>
                      <br />
                      Analysis
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="igs-nav-link" to="/diagnoses">
                      <i className="fas fa-diagnoses"></i>
                      <br />
                      Diagnoses
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="igs-nav-link" to="/analogize">
                      <i className="fas fa-not-equal"></i>
                      <br />
                      Analogize
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="igs-nav-link" to="/download">
                      <i className="fas fa-cloud-download-alt"></i>
                      <br />
                      Download
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
            <img
              alt="download"
              data-toggle="tooltip"
              data-placement="left"
              title="Install IGSAnalyzer"
              style={{
                display: this.state.installButton ? "unset" : "none",
                // display:  "unset" ,
                filter: "drop-shadow(0 2px 4px rgba(34,36,38,0.35))",
                position: "fixed",
                cursor: "pointer",
                padding: 0,
                zIndex: 10,
                bottom: 15,
                right: 15
              }}
              onClick={this.installApp}
              src="data:image/png;base64,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"
            />
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
            <Route
              path="/analogize/"
              Result={this.state.Result}
              component={props => (
                <Analogize {...props} Result={this.state.Result} />
              )}
            />
            <Route
              path="/download/"
              Result={this.state.Result}
              component={props => (
                <Download {...props} Result={this.state.Result}/>
              )}
            />
            <div className="row">
              {/* <img
                className="img-fluid align-self-center col-md-5"
                alt="loading"
                src="./loading.png"
              /> */}
              <div className="col-md-8 mx-auto text-center align-self-center mt-2">
                {/* <div className="">
                  <p className="lead">
                    © {new Date().getFullYear()} IGSAnalyzer All Rights Reserved
                  </p>
                </div> */}
                {/* <img
                  alt=""
                  className="w-75"
                  src="undraw_environmental_study_skau.svg"
                /> */}
                {/* <br /> */}
                {/* <img
                  className="w-25"
                  src="https://firelaunchers.com/offers/instagram-follower-magnet-with-plr-upsell/images/illustration_1.png"
                /> */}
                <img
                  className="w-25"
                  src="https://seguidores.online/wp-content/uploads/2019/01/entrar-a-Instagram-sin-c%C3%B3digo-de-verificaci%C3%B3n.png"
                />
                {/* <img
                  className="w-50"
                  src="https://instazood.com/wp-content/uploads/2019/05/Instagram-Marketing-Automation4@2x.png"
                /> */}
                {/* <img
                  className="w-25"
                  src="https://mixtarget.com/wp-content/uploads/2019/06/influencer.png"
                /> */}
                {/* <img
                  alt=""
                  className="w-75"
                  src="https://www.geckoboard.com/assets/analysis-guide-illo-4.png"
                /> */}

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
