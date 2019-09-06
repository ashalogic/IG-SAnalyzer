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
          {/* <div className="jumbotron">
            <h1 className="display-4">Hello, world!</h1>
            <p className="lead">
              This is a simple hero unit, a simple jumbotron-style component for
              calling extra attention to featured content or information.
            </p>
          </div> */}
          <div
            style={{
              // backgroundImage:
              //   "url('https://www.hypesthive.com/images/main-page/Header_Brands_2560px.png')",
              // backgroundPosition: "top",
              // backgroundSize:"cover",
              // display: "none",
              overflow: "hidden"
              // backgroundColor: "#fff"
              // color: "#fff"
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
              alt="footer"
              className="w-75 mx-auto"
              src="https://meetsylo.com/assets/images/temp/about-intro@2x.png"
            />
            {/* <img
              className="w-25"
              src="https://getswarm.co/wp-content/uploads/2019/07/175e42060fd8694667a8ae0fc3f6265d-640x600.png"
            />
            {/* <div
              style={{
                position: "absolute",
                height: "100px",
                width: "150px",
                bottom: "0px",
                right: "0px",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right",
                backgroundImage:
                  "url('https://cdn.dribbble.com/users/3484423/screenshots/7066608/media/dbe543809f6c5ec672cdba61a1ef2fa0.png')",
                // background:
                // "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(64,93,230,1) 23%, rgba(88,81,219,1) 29%, rgba(131,58,180,1) 35%, rgba(193,53,132,1) 41%, rgba(225,48,108,1) 47%, rgba(253,29,29,1) 53%, rgba(245,96,64,1) 59%, rgba(247,119,55,1) 65%, rgba(252,175,69,1) 71%, rgba(255,220,128,1) 77%, rgba(255,255,255,1) 100%)",
                // backgroundImage: "url('./44340.png')",
                // filter: "saturate(180%) blur(40px)"
                // backgroundc: rgba(255, 255, 255, 0.7)backdrop-filter:
              }}
            /> */}
          </div>
        </div>
        <div className="col-md-12 align-self-center mb-4">
          <FeaturesTable data={this.props.Result} />
        </div>
      </div>
    );
  }
}
