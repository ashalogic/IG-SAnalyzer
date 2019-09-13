import React from "react";
import { Suspense } from "react";
// import CloudWords from "../Components/CloudWords";
// import TopPostEmbed from "../Components/TopPostEmbed";
import MentionsTable from "../Components/MentionsTable";
import HashtagsTable from "../Components/HashtagsTable";
const CloudWords = React.lazy(() => import("../Components/CloudWords"));

export default class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  componentDidMount() {}

  render() {
    return (
      <div className="row mb-4">
        <div className="col-md-7 align-self-center mt-4">
          <h4 className="Righteous">
            <i class="fab fa-cloudversify mr-1"></i>Top Words
          </h4>
          <hr />
          <Suspense
            fallback={
              <div class="spinner-grow" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            }
          >
            <CloudWords data={this.props.Result} />
          </Suspense>
        </div>
        <div className="col-md-5 mx-auto align-self-start text-center">
          <div
            style={{
              overflow: "hidden"
            }}
            className=""
          >
            <img
              alt="content"
              className="w-75 mx-auto"
              src="./contentimg.png"
            />
          </div>
        </div>
        <div className="col-md-6 align-self-center mt-4">
          <h4 className="Righteous">
            <i class="fas fa-at mr-1"></i>Top Mentions
          </h4>
          <hr />
          <MentionsTable data={this.props.Result.Medias} />
        </div>
        <div className="col-md-6 align-self-center mt-4">
          <h4 className="Righteous">
            <i class="fas fa-hashtag mr-1"></i>Top Hashtags
          </h4>
          <hr />
          <HashtagsTable data={this.props.Result.Medias} />
        </div>
        
      </div>
    );
  }
}
