import React from "react";
// import CloudWords from "../Components/CloudWords";
import MentionsTable from "../Components/MentionsTable";
import HashtagsTable from "../Components/HashtagsTable";
import TopPostEmbed from "../Components/TopPostEmbed";
import { Suspense, lazy } from 'react';
const CloudWords = React.lazy(() => import("../Components/CloudWords"));

export default class Content extends React.Component {
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
        <div className="col-md-12 mb-4 align-self-center">
          <h4 className="Righteous">Top Words</h4>
          <Suspense fallback={<div>Loading...</div>}>
            <CloudWords data={this.props.Result} />
          </Suspense>
        </div>
        <div className="col-md-6 mb-4 align-self-center">
          <h4 className="Righteous">Top 5 Mentions</h4>
          <MentionsTable data={this.props.Result.Medias} />
        </div>
        <div className="col-md-6 mb-4 align-self-center">
          <h4 className="Righteous">Top 5 Hashtags</h4>
          <HashtagsTable data={this.props.Result.Medias} />
        </div>
        <div className="col-md-4 mb-4 align-self-center">
          <h4 className="Righteous">Top Post</h4>
          <TopPostEmbed data={this.props.Result} />
        </div>
        {/* <div className="col-md-8 mb-4 align-self-center" /> */}
      </div>
    );
  }
}
