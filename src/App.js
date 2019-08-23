import "./App.css";
import React from "react";
import NavBar from "./Cards/NavBar";
import { FetchData } from "./Instagram.js";
import ProfileCardv2 from "./Cards/ProfileCardv2";
import FeaturesTable from "./Components/FeaturesTable";
import LikeCommentBC from "./Components/LikeCommentBC";
import MediasTypesPC from "./Components/MediasTypesPC";
import EngagementsCalander from "./Components/EngagementsCalander";
import LikeCommentEngagementBLC from "./Components/LikeCommentEngagementBLC";
import CloudWords from "./Components/CloudWords";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      username: "golfarahani"
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    // this.fetchData = this.fetchData.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  // fetchData(event) {
  //   return

  // this.setState(
  //   {
  //     isLoading: false,
  //     Result: Result
  //     // LCChart: LCChart,
  //     // LCEChart: LCEChart,
  //     // MTPChart: MTPChart,
  //     // words: cloudwordss,
  //     // CalenderChartData: CalenderChartData,
  //     // dataSource: responseJson,
  //     // totaleng: TotalEngagement,
  //     // avglike: Likes.reduce((a, b) => a + b, 0) / Medias.length,
  //     // avgcomment: Comments.reduce((a, b) => a + b, 0) / Medias.length
  //   },
  //   function() {}
  // );
  // console.log(Result);
  // const distinct = (value, index, self) => {
  //   return self.indexOf(value) === index;
  // };
  // console.log(words.filter(distinct));
  // }

  componentDidMount() {
    return FetchData(this.state.username).then(x => {
      this.setState({ isLoading: false, Result: x }, function() {});
    });
  }

  render() {
    if (this.state.isLoading) {
      // if (true) {
      // if (false) {
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
          <div className="col">
            <div
              className="card igs-card card-2 border-0"
              style={{
                backgroundColor: "unset",
                backdropFilter: "saturate(80%) blur(4px)"
              }}
            >
              <div className="card-body">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span
                      className="input-group-text border-0"
                      style={{
                        backgroundColor: "unset",
                        color: "#000"
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
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-4">
            <ProfileCardv2
              bio={this.state.Result.Account.biography}
              fullname={this.state.Result.Account.full_name}
              picture={this.state.Result.Account.profile_pic_url_hd}
            />
          </div>
          <div className="col-md-8 align-self-center">
            <FeaturesTable data={this.state.Result} />
          </div>
        </div>
        <br />
        <div className="row ">
          <div className="col-md-6 mb-4">
            <LikeCommentBC data={this.state.Result} />
          </div>
          <div className="col-md-6 mb-4">
            <LikeCommentEngagementBLC data={this.state.Result} />
          </div>
          <div className="col-md-12 mb-4">
            <EngagementsCalander data={this.state.Result} />
          </div>
          <div className="col-md-6 mb-4">
            <MediasTypesPC data={this.state.Result} />
          </div>
          <div className="col-md-6 mb-4 align-self-center">
            <CloudWords data={this.state.Result} />
          </div>
        </div>
      </div>
    );
  }
}
