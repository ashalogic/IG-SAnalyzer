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

  const colors = [
    "#fce4ec",
    "#f8bbd0",
    "#f48fb1",
    "#f06292",
    "#ec407a",
    "#e91e63",
    "#d81b60",
    "#c2185b",
    "#ad1457",
    "#880e4f"
  ];

  return (
    <div
      className="card border-0"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.7)"
      }}
    >
      <div className="card-body d-none d-lg-block" style={{ height: "396px" }}>
        <h5 className="Righteous text-center" style={{ color: "#666666" }}>
          <b>Impression Calendar</b>
        </h5>
        <ResponsiveCalendarCanvas
          data={Dates}
          to={Dates[0].day}
          from={Dates[Dates.length - 1].day}
          emptyColor="rgba(255, 255, 255, 0.7)"
          colors={colors}
          // margin={{ top: 20, right: 40, bottom: 20, left: 40 }}
          yearSpacing={40}
          margin={{ top: 30, right: 30, bottom: 60, left: 30 }}
          monthBorderWidth={0}
          monthBorderColor="#e3e3e3"
          daySpacing={0}
          dayBorderWidth={1}
          dayBorderColor="#e3e3e3"
          legends={[
            {
              anchor: "bottom-right",
              direction: "row",
              translateY: 42,
              itemCount: 8,
              itemWidth: 42,
              itemHeight: 36,
              itemsSpacing: 14,
              itemDirection: "right-to-left"
            }
          ]}
        />
      </div>
      <div
        className="card-body d-none d-md-block d-lg-none"
        style={{ height: "296px" }}
      >
        <h5 className="Righteous text-center" style={{ color: "#666666" }}>
          <b>Impression Calendar</b>
        </h5>
        <ResponsiveCalendarCanvas
          data={Dates}
          to={Dates[0].day}
          from={Dates[Dates.length - 1].day}
          emptyColor="rgba(255, 255, 255, 0.7)"
          colors={colors}
          // margin={{ top: 20, right: 40, bottom: 20, left: 40 }}
          yearSpacing={40}
          margin={{ top: 30, right: 30, bottom: 60, left: 30 }}
          monthBorderWidth={0}
          monthBorderColor="#e3e3e3"
          daySpacing={0}
          dayBorderWidth={1}
          dayBorderColor="#e3e3e3"
          legends={[
            {
              anchor: "bottom-right",
              direction: "row",
              translateY: 42,
              itemCount: 8,
              itemWidth: 42,
              itemHeight: 36,
              itemsSpacing: 14,
              itemDirection: "right-to-left"
            }
          ]}
        />
      </div>
      <div className="card-body d-sm-none" style={{ height: "696px" }}>
        <h5 className="Righteous text-center" style={{ color: "#666666" }}>
          <b>Impression Calendar</b>
        </h5>
        <ResponsiveCalendarCanvas
          data={Dates}
          to={Dates[0].day}
          from={Dates[Dates.length - 1].day}
          emptyColor="rgba(255, 255, 255, 0.7)"
          colors={colors}
          // margin={{ top: 20, right: 40, bottom: 20, left: 40 }}
          yearSpacing={40}
          direction="vertical"
          margin={{ top: 30, right: 30, bottom: 60, left: 30 }}
          monthBorderWidth={0}
          monthBorderColor="#e3e3e3"
          daySpacing={0}
          dayBorderWidth={1}
          dayBorderColor="#e3e3e3"
          legends={[
            {
              anchor: "bottom-right",
              direction: "row",
              translateY: 42,
              itemCount: 8,
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
