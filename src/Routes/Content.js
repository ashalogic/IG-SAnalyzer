import React from "react";
import MentionsTable from "../Components/MentionsTable";
import HashtagsTable from "../Components/HashtagsTable";
import CloudWords from "../Components/CloudWords";
import MediasTable from "../Components/MediasTable";
import TPDisplay from "../Components/TPDisplay";

export default class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  componentDidMount() {}

  render() {
    return (
      <div className="row mb-4">
   
        <div className="col-md-6 mt-4">
          <h4 className="Righteous">
            <i class="fab fa-cloudversify mr-1"></i>Words
          </h4>
          <hr />
          <CloudWords data={this.props.Result} />
        </div>
        <div className="col-md-6 align-self-center mt-4 text-center">
          {/* <div
            className="card card-1 border-0"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.7)"
            }}
          >
            <div className="card-body">
              <h1>Null</h1>
            </div>
          </div> */}
           <img
              alt="footerr"
              className="w-75 mx-auto"
              src="undraw_content_vbqo.svg"
            />
        </div>
        <div className="col-md-12 mt-4">
          <h4 className="Righteous">
            <i class="fas fa-tv mr-1"></i>Images 
          </h4>
          <hr />
          <TPDisplay data={this.props.Result} />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="Righteous">
            <i class="fas fa-at mr-1"></i>Top Mentions
          </h4>
          <hr />
          <MentionsTable data={this.props.Result.Medias} />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="Righteous">
            <i class="fas fa-hashtag mr-1"></i>Top Hashtags
          </h4>
          <hr />
          <HashtagsTable data={this.props.Result.Medias} />
        </div>
        <div className="col-md-12 mt-4">
          <h4 className="Righteous">
            <i class="fas fa-photo-video mr-1"></i>Last 12 Post
          </h4>
          <hr />
          <MediasTable data={this.props.Result.Medias} />
        </div>
      </div>
    );
  }
}
