import React from "react";
// import "./ProfileCard.css";

function FeatureCard(props) {
  return (
    <div
      className="card card-2 border-0 mb-4"
      style={{
        textShadow: "0px 0px 4px #000"
        // overflow: "hidden"
      }}
    >
      <div
        className="card-body text-white"
        style={{
          background: "url('" + props.kir + "')"
          // "linear-gradient( #400080, transparent), linear-gradient(200deg, #d047d1, #ff0000,#ffff00)"
          // backgroundColor: props.bgcolor,
          // filter: "saturate(180%) blur(80px)",
          // overflow: "hidden"
        }}
      >
        <div className="row">
          <div className="col text-center">
            <div
              className="m-n4 p-4 profile-card-glass-effect"
              style={{ backdropFilter: "saturate(180%) blur(120px)" }}
            >
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
          </div>
        </div>
      </div>
    </div>
  );
}
export default FeatureCard;
