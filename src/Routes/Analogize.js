import React from "react";
import TopPostEmbed from "../Components/TopPostEmbed";

export default class Analogize extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="row mb-4 mt-4">
        <div className="col">
          <div className="row mb-4">
            <div className="col-md-10 mx-auto">
              <div id="AnalogizeTextboxDiv" className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
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
                  style={
                    {
                      // backgroundColor: "transparent",
                      // borderColor: "#000",
                      // color: "#000",
                      // border: "none",
                      // borderRadius: "0",
                      // borderBottom: "#000 solid 1px"
                    }
                  }
                  //   ref={this.usernametextInput}
                />
                <div className="input-group-append">
                  <button
                    // onClick={this.handleClick}
                    className="btn btn-dark"
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
                    Compare
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "-ms-flexbox",
              display: "flex",
              //   -ms-flex-wrap: nowrap,
              flexWrap: "nowrap",
              paddingBottom: "1rem",
              marginTop: "-1px",
              overflowX: "auto",
              //   textAlign: "center",
              whiteSpace: "nowrap",
              WebkitOverflowScrolling: "touch"
            }}
            className="row "
          >
            <div className="col-md-4 mx-auto">
              <TopPostEmbed data={this.props.Result} />
            </div>
            <div className="col-md-4 mx-auto">
              <TopPostEmbed data={this.props.Result} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-10 mx-auto">
              <div
                className="card border-0"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.7)"
                }}
              >
                <div className="card-body">
                  <table class="table table-hover text-left">
                    <tbody>
                      <tr>
                        <td>Caption Length (chars)</td>
                        <td>100</td>
                        <td>250</td>
                      </tr>
                      <tr>
                        <td>Likes</td>
                        <td>100</td>
                        <td>250</td>
                      </tr>
                      <tr>
                        <td>Comments</td>
                        <td>100</td>
                        <td>250</td>
                      </tr>
                      <tr>
                        <td>Eng</td>
                        <td>100</td>
                        <td>250</td>
                      </tr>
                      <tr>
                        <td>Followr</td>
                        <td>100</td>
                        <td>250</td>
                      </tr>
                      <tr>
                        <td>Avr Eng</td>
                        <td>100</td>
                        <td>250</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
