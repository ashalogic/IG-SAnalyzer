import React from "react";
// import "./ProfileCard.css";

function FeatureCard(props) {
  return (
    <div className="col-6 col-md-3 text-center p-4">
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
      <h5 className="Righteous text-center mt-3 mb-2">{props.title}</h5>
      <h3 className="text-center">{props.value}</h3>
    </div>
  );
}
export default FeatureCard;
