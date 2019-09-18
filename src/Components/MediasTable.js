import React from "react";

function MediasTable(props) {
  return (
    <div>
      {props.data.edges.slice(0, 12).map((post, i) => (
        <div
          className="card mb-1 card-1 border-0 rounded-0"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.7)"
          }}
        >
          <div className="card-body p-2">
            <div key={i} className="row">
              <div className="col-4 col-md-1 text-center">
                <div
                  className="rounded-circle mx-auto"
                  style={{
                    height: "64px",
                    width: "64px",
                    backgroundSize: "cover",
                    backgroundImage: "url('" + post.node.display_url + "')"
                  }}
                />
              </div>
              <div className="col-4 col-md-2 align-self-center text-left">
                <h6>
                  <i class="far fa-calendar-alt mr-1"></i>
                  {new Date(
                    Number(post.node.taken_at_timestamp + "000")
                  ).toLocaleDateString()}
                </h6>
              </div>
              <div className="col-4 col-md-2 align-self-center text-left">
                <span
                  data-toggle="tooltip"
                  data-placement="top"
                  title={
                    post.node.edge_media_to_caption.edges[0]
                      ? post.node.edge_media_to_caption.edges[0].node.text
                      : "no caption"
                  }
                >
                  {post.node.edge_media_to_caption.edges[0]
                    ? post.node.edge_media_to_caption.edges[0].node.text.slice(
                        0,
                        20
                      ) + "..."
                    : "no caption"}
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
              <div className="col-4 col-md-2 align-self-center text-left mt-2">
                <span style={{ color: "rgb(225, 48, 108)" }}>
                  <i class="far fa-heart mr-1"></i>
                  {post.node.edge_media_preview_like.count}
                </span>
              </div>
              <div className="col-4 col-md-2 align-self-center text-left mt-2">
                <span>
                  <i class="far fa-comments mr-1"></i>
                  {post.node.edge_media_to_comment.count}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default MediasTable;
