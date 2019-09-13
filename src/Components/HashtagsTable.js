import React from "react";

function HashtagsTable(props) {
  //Finde Mention
  var hashtags = [];
  props.data.edges.forEach(x => {
    var edges = x.node.edge_media_to_caption.edges;
    if (edges.length > 0 && edges[0].node.text !== "") {
      var caption = edges[0].node.text;
      caption.split(" ").forEach(word => {
        if (word[0] === "#" && word.indexOf("#") === word.lastIndexOf("#"))
          hashtags.push(word);
      });
    }
  });

  hashtags = hashtags.sort();
  var countedhashtags = [];
  var current = null;
  var cnt = 0;
  for (var i = 0; i < hashtags.length; i++) {
    if (hashtags[i] !== current) {
      if (cnt > 0) {
        countedhashtags.push({
          tag: current,
          count: cnt
        });
      }
      current = hashtags[i];
      cnt = 1;
    } else {
      cnt++;
    }
  }
  if (cnt > 0) {
    countedhashtags.push({
      tag: current.trim(),
      count: cnt
    });
  }
  countedhashtags.sort((a, b) => (a.count < b.count ? 1 : -1));
  return (
    <div
      className="card border-0"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.7)"
      }}
    >
      <div className="card-body">
        <table class="table">
          <thead className="Righteous text-center">
            <tr>
              <th scope="col">
                <i class="fas fa-hashtag"></i>
              </th>
              <th scope="col">Tag</th>
              <th scope="col">Count</th>
            </tr>
          </thead>
          <tbody>
            {countedhashtags.splice(0, 5).map((hashtag, i) => (
              <tr className="text-center" key={i}>
                <th>#</th>
                <td>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={
                      "https://www.instagram.com/explore/tags/" +
                      hashtag.tag.slice(1, hashtag.tag.length)
                    }
                    className="btn btn-outline-dark btn-block kr-mixed"
                  >
                    {hashtag.tag.replace("#", "")}
                  </a>
                </td>
                <td>{hashtag.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default HashtagsTable;
