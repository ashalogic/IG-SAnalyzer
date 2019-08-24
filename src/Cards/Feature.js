import React from "react";
// import "./ProfileCard.css";

function FeatureCard(props) {
  return (
    <div className="col-6 col-md-3 text-center mb-2">
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
      <p className="Righteous lead text-center">{props.title}</p>
      <h4 className="text-center">{props.value}</h4>
    </div>
  );
}
export default FeatureCard;
