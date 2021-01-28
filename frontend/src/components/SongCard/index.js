import React from "react";
// import { NavLink } from "react-router-dom";
import "./index.css";
import { Card } from "antd";
const { Meta } = Card;

function SongCard({ data }) {
  let songData;

  if (data) {
    songData = data.homeFiles[0];
  } else {
  }

  console.log(songData);

  return (
    <div style={{ width: 150, marginLeft: 10 }}>
      {songData ? (
        <Card
          style={{
            color: "white",
            width: 150,
          }}
          cover={<img alt="example" src={songData.image} />}
          bordered={false}
        >
          <Meta style={{ color: "white" }} title={songData.title}>
            <p style={{ color: "white" }}>{songData.title}</p>
          </Meta>
        </Card>
      ) : (
        <Card bordered={false} style={{ width: 200 }} loading={true} />
      )}
    </div>
  );
}

export default SongCard;
