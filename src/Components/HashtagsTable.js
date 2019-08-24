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
      className="card igs-card card-2 border-0"
      style={{
        backgroundColor: "unset",
        backdropFilter: "saturate(80%) blur(4px)"
      }}
    >
      <div className="card-body">
        <table class="table">
          <thead className="Righteous">
            <tr>
              <th scope="col">Tag</th>
              <th scope="col">Count</th>
              <th scope="col">Link</th>
            </tr>
          </thead>
          <tbody>
            {countedhashtags.splice(0, 5).map((hashtag, i) => (
              <tr key={i}>
                <th scope="row">{hashtag.tag}</th>
                <td>{hashtag.count}</td>
                <td>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={
                      "https://www.instagram.com/explore/tags/" +
                      hashtag.tag.slice(1, hashtag.tag.length)
                    }
                    className="btn btn-outline-info btn-block"
                  >
                    View More
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default HashtagsTable;
