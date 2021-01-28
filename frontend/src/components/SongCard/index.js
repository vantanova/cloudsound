import React from "react";
// import { NavLink } from "react-router-dom";
import "antd/dist/antd.css";
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
          style={{ width: 150 }}
          cover={<img alt="example" src={songData.image} />}
        >
          <Meta title={songData.title} />
        </Card>
      ) : (
        <Card style={{ width: 200 }} loading={true} />
      )}
    </div>
  );
}

export default SongCard;
