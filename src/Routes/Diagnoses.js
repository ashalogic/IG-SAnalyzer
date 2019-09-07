import React from "react";
import MediasTable from "../Components/MediasTable";

export default class Diagnoses extends React.Component {
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
      <div className="row ">
        <div className="col-md-12">
          <h4 className="Righteous">Last 12 Post</h4>
          <MediasTable data={this.props.Result.Medias} />
        </div>
      </div>
    );
  }
}
