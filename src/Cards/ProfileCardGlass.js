import React from "react";
import "./ProfileCardGlass.css";

function ProfileCard(props) {
  return (
    <div
      className="card card-3 border-0 mb-4 profile-card-glass"
      style={{ backgroundImage: "url(" + props.picture + ")" }}
    >
      <div className="card-body text-white">
        <div className="m-n4 p-4 profile-card-glass-effect">
          <div className="row">
            <div className="col">
              <div
                className="mx-auto rounded-circle profilecard-image-style"
                style={{ backgroundImage: "url(" + props.picture + ")" }}
              />
            </div>
          </div>
          <br />
          <h2 className="text-center Righteous">
            {props.fullname.replace(
              /([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g,
              ""
            )}
          </h2>
        </div>
      </div>
    </div>
  );
}
export default ProfileCard;
