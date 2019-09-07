import React from "react";
import "./ProfileCardv2.css";

function ProfileCard(props) {
  return (
    <div
      className="card-1 rounded-0 border-0"
      // style={{ backgroundColor: "unset", backdropFilter: " blur(8px)" }}
    >
      <div className="card-body p-0 overflow-hidden">
        <div
          className="profilecard-background"
          style={{ backgroundImage: "url(" + props.picture + ")" }}
        />
        <div className="profilecard-border-container">
          <div className="profilecard-border" />
        </div>
        <div
          className="rounded-circle profilecard-image"
          style={{ backgroundImage: "url(" + props.picture + ")" }}
        />
        {/* <h2 className="Righteous text-center profilecard-text">
          {String(
            props.fullname.replace(
              /([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g,
              ""
            )
          ).replace("⠀", "")}
        </h2> */}
        <h3 className="Righteous text-center profilecard-text">
          {props.fullname.replace(/[^a-zA-Z ]/g, "")}
        </h3>
      </div>
    </div>
  );
}
export default ProfileCard;
