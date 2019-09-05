import React from "react";
import ProfileCardv2 from "../Cards/ProfileCardv2";
import FeaturesTable from "../Components/FeaturesTable";

export default class Fingerprint extends React.Component {
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
        <div className="col-md-5 align-self-center mt-2 mb-4">
          <ProfileCardv2
            bio={this.props.Result.Account.biography}
            fullname={this.props.Result.Account.full_name}
            picture={this.props.Result.Account.profile_pic_url_hd}
          />
        </div>
        <div className="col-md-6 mx-auto align-self-center mt-2 mb-4">
          <div className="card-2 p-4">
            <p></p>
            <blockquote class="blockquote">
              <p class="mb-0">{this.props.Result.Account.biography}</p>
              <footer class="blockquote-footer">
              {this.props.Result.Account.full_name} in <cite title="Source Title">Instagram</cite>
              </footer>
            </blockquote>
          </div>
        </div>
        <div className="col-md-12 align-self-center mb-4">
          <FeaturesTable data={this.props.Result} />
        </div>
      </div>
    );
  }
}
