import React from "react";
import "./ProfileCard.css";

function ProfileCard(props) {
  return (
    <div className="card shadow mb-4 profilecard-style">
      <div className="card-body">
        <div>
          <br />
          <div className="profilecard-background-style mx-auto" />
          <div className="profilecard-image-text-box-style">
            <div
              className="rounded-circle mx-auto profilecard-image-style"
              style={{ backgroundImage: "url(" + props.picture + ")" }}
            />
          </div>
          <br />
          <h1 className="text-center fontc">{props.fullname}</h1>
          <blockquote class="blockquote text-center fontc">
            <p class="mb-0">{props.bio}</p>
            <footer class="blockquote-footer">
              {props.fullname} in <cite title="Source Title">instagram</cite>
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
}
export default ProfileCard;
