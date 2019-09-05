import React from "react";
// import "./ProfileCard.css";

function FeatureCard(props) {
  return (
    <div className="col-6 col-md-2 text-center">
      <img
        alt={props.icon}
        className="mx-autop-1"
        src={props.icon}
        style={{
          // backgroundColor: "#fff",
          width: "64px",
          height: "64px"
        }}
      />
      <p className=" text-center mt-3 mb-0">{props.title}</p>
      <p className="text-center">{props.value}</p>
    </div>
  );
}
export default FeatureCard;
