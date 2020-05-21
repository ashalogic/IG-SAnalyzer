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
        <div className="col-md-5 align-self-center mt-4 mb-4">
          <ProfileCardv2
            bio={this.props.Result.Account.biography}
            fullname={this.props.Result.Account.full_name}
            picture={this.props.Result.Account.profile_pic_url_hd}
          />
        </div>
        <div className="col-md-7 mx-auto align-self-end text-center">
          <div
            style={{
              overflow: "hidden"
            }}
            className=""
          >
            <blockquote className="blockquote p-4 pt-0">
              <p className="mb-0">{this.props.Result.Account.biography}</p>
              <footer className="blockquote-footer">
                {this.props.Result.Account.full_name} in{" "}
                <cite title="Source Title">Instagram</cite>
              </footer>
            </blockquote>
            <img
              alt="footerr"
              className="w-50 mx-auto"
              src="undraw_social_bio_8pql.svg"
            />
           
          </div>
        </div>
        <div className="col-md-12 align-self-center mb-4">
          <FeaturesTable data={this.props.Result} />
        </div>
      </div>
    );
  }
}
