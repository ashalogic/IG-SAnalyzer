import React from "react";
import Feature from "../Cards/Feature";

function FeaturesTable(props) {
  var ISPrivate = props.data.Account.is_private;
  // var ISVerified = props.data.Account.is_verified;
  // var Following = props.data.Account.edge_follow.count;
  var Followers = props.data.Account.edge_followed_by.count;
  // var ISBusiness_account = props.data.Account.is_business_account;
  // var Bio = props.data.Account.edge_owner_to_timeline_media.count;
  var MediasCount = props.data.Account.edge_owner_to_timeline_media.count;
  var Likes = props.data.Medias.edges.map(x => {
    return x.node.edge_media_preview_like.count;
  });
  var Comments = props.data.Medias.edges.map(x => {
    return x.node.edge_media_to_comment.count;
  });
  var TotalEngagement =
    ((Likes.reduce((a, b) => a + b, 0) + Comments.reduce((a, b) => a + b, 0)) /
      props.data.Medias.edges.length /
      Followers) *
    100;
  var AverageLikes =
    Likes.reduce((a, b) => a + b, 0) / props.data.Medias.edges.length;
  var AverageComments =
    Comments.reduce((a, b) => a + b, 0) / props.data.Medias.edges.length;

  return (
    <div
      className="card border-0"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.7)"
      }}
    >
      <div className="card-body p-1 pt-4">
        <div className="row">
          {ISPrivate ? (
            <Feature icon="ico/private-color.png" title="Private" value=":(" />
          ) : null}
          <Feature
            icon="ico/social-engagement.png"
            title="Impression"
            value={TotalEngagement.toFixed(2) + "%"}
          />
          <Feature
            icon="ico/group.png"
            title="Followers"
            value={Followers.toLocaleString()}
          />
          <Feature
            icon="ico/social-media-like.png"
            title="Likes"
            value={parseInt(AverageLikes.toFixed(0)).toLocaleString()}
          />
          <Feature
            icon="ico/social-media-comment.png"
            title="Comments"
            value={parseInt(AverageComments.toFixed(0)).toLocaleString()}
          />
          {/* {ISVerified ? (
            <Feature icon="ico/correct.png" title="Verified" value=":)" />
          ) : null} */}
          <Feature
            icon="ico/share.png"
            title="Medias"
            value={MediasCount.toLocaleString()}
          />
          <Feature
            icon="ico/social-media-like-comment.png"
            title="Total L&C"
            value={(
              Likes.reduce((a, b) => a + b, 0) +
              Comments.reduce((a, b) => a + b, 0)
            ).toLocaleString()}
          />
          {/* <Feature
            icon="ico/commission (1).png"
            title="Commission"
            value="$52,200"
          /> */}
          {/* <Feature
            icon="ico/social-media (1).png"
            title="Following"
            value={Following.toLocaleString()}
          /> */}
        </div>
      </div>
    </div>
  );
}
export default FeaturesTable;
