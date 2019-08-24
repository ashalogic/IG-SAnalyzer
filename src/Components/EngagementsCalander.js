import React from "react";
import { ResponsiveCalendarCanvas } from "@nivo/calendar";

function EngagementsCalander(props) {
  var Followers = props.data.Account.edge_followed_by.count;
  var Dates = props.data.Medias.edges.map(x => {
    var d = new Date(Number(x.node.taken_at_timestamp + "000"));
    var mm = String(d.getMonth()).padStart(2, "0");
    var dd = String(d.getDate()).padStart(2, "0");
    var yy = d.getFullYear();
    return {
      day: yy + "-" + mm + "-" + dd,
      value:
        ((x.node.edge_media_preview_like.count +
          x.node.edge_media_to_comment.count) /
          Followers) *
        100
    };
  });

  return (
    <div
      className="card igs-card card-2 border-0"
      style={{
        backgroundColor: "unset",
        backdropFilter: "saturate(80%) blur(4px)"
      }}
    >
      <div className="card-body" style={{ height: "296px" }}>
        <ResponsiveCalendarCanvas
          data={Dates}
          to={Dates[0].day}
          from={Dates[Dates.length - 1].day}
          emptyColor="#eeeeee"
          colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
          margin={{ top: 20, right: 40, bottom: 20, left: 40 }}
          yearSpacing={40}
          monthBorderColor="#ffffff"
          dayBorderWidth={2}
          dayBorderColor="#ffffff"
          legends={[
            {
              anchor: "bottom-right",
              direction: "row",
              translateY: 32,
              itemCount: 4,
              itemWidth: 42,
              itemHeight: 36,
              itemsSpacing: 14,
              itemDirection: "right-to-left"
            }
          ]}
        />
      </div>
    </div>
  );
}
export default EngagementsCalander;
