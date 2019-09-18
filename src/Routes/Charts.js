import React from "react";
import LCLike from "../Components/LCLike";
import LCComment from "../Components/LCComment";
import MediasTypesPC from "../Components/MediasTypesPC";
import EngagementsCalander from "../Components/EngagementsCalander";
// import LikeCommentEngagementBLC from "../Components/LikeCommentEngagementBLC";
import LBCEngagement from "../Components/LBCEngagement";
import PCEngagementHour from "../Components/PCEngagementHour";

export default class Charts extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  componentDidMount() {}

  render() {
    return (
      <div className="row mb-4">
        <div className="col-md-12 col-lg-6 col-xl-6 mt-4">
          <LCLike data={this.props.Result} />
        </div>
        <div className="col-md-12 col-lg-6 col-xl-6 mt-4">
          <LCComment data={this.props.Result} />
        </div>
        <div className="col-md-12 mt-4">
          <LBCEngagement data={this.props.Result} />
        </div>
        <div className="col-md-12 mt-4">
          <EngagementsCalander data={this.props.Result} />
        </div>
        <div className="col-md-6 mt-4">
          <MediasTypesPC data={this.props.Result} />
        </div>
        <div className="col-md-6 mt-4">
          <PCEngagementHour data={this.props.Result} />
        </div>
      </div>
    );
  }
}
