import React from "react";
import LikeCommentBC from "../Components/LikeCommentBC";
// import MediasTypesPC from "../Components/MediasTypesPC";
import EngagementsCalander from "../Components/EngagementsCalander";
import LikeCommentEngagementBLC from "../Components/LikeCommentEngagementBLC";
import { Suspense } from "react";
const MediasTypesPC = React.lazy(() => import("../Components/MediasTypesPC"));

export default class Charts extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  componentDidMount() {
    this.setState(
      {
        isLoading: false
      },
      function() {}
    );
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div className="container">
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
      <div className="row">
        <div className="col-md-12 mb-4">
          <h4 className="Righteous">Like & Comment through time</h4>
          <LikeCommentBC data={this.props.Result} />
        </div>
        <div className="col-md-12 mb-4">
          <h4 className="Righteous">Like,Comment, Engagement through time</h4>
          <LikeCommentEngagementBLC data={this.props.Result} />
        </div>
        <div className="col-md-12 mb-4">
          <h4 className="Righteous">Engagement Calander</h4>
          <EngagementsCalander data={this.props.Result} />
        </div>
        <div className="col-md-6 mb-4">
          <h4 className="Righteous">Media Types</h4>
          <Suspense fallback={<div>Loading...</div>}>
            <MediasTypesPC data={this.props.Result} />
          </Suspense>
        </div>
      </div>
    );
  }
}
