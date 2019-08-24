import React from "react";

function MediasTable(props) {
  return (
    <div>
      {props.data.edges.slice(0, 12).map((post, i) => (
        <div
          key={i}
          className="row mb-2 card-1 p-2"
          style={{
            // backgroundColor: "rgba(227,227,227,0.7)",
            backgroundColor: "unset",
            backdropFilter: "saturate(80%) blur(4px)"
          }}
        >
          <div className="col-4 col-md-1 text-center">
            <img
              alt="instagram"
              className="rounded-circle mx-auto"
              style={{ height: "64px", width: "64px" }}
              src={post.node.thumbnail_resources[1].src}
            />
          </div>
          <div className="col-4 col-md-2 align-self-center text-center">
            <h6>
              {new Date(
                Number(post.node.taken_at_timestamp + "000")
              ).toLocaleDateString()}
            </h6>
          </div>
          <div className="col-4 col-md-2 align-self-center text-center">
            <span
              data-toggle="tooltip"
              data-placement="top"
              title={
                post.node.edge_media_to_caption.edges[0]
                  ? post.node.edge_media_to_caption.edges[0].node.text
                  : "no comment"
              }
            >
              {post.node.edge_media_to_caption.edges[0].node.text.slice(0, 20) +
                "..."}
            </span>
          </div>
          <div className="col-4 col-md-2 align-self-center text-center mt-2">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={"https://www.instagram.com/p/" + post.node.shortcode}
              className="btn btn-outline-info btn-block"
            >
              View Post
            </a>
          </div>
          <div className="col-4 col-md-2 align-self-center text-center mt-2">
            <span>{post.node.edge_media_preview_like.count}</span>
          </div>
          <div className="col-4 col-md-2 align-self-center text-center mt-2">
            <span>{post.node.edge_media_to_comment.count}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
export default MediasTable;
