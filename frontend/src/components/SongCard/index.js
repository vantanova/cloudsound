import React from "react";
// import { NavLink } from "react-router-dom";
import "./index.css";
import { Card } from "antd";
const { Meta } = Card;

function SongCard({ file }) {
  console.log(file);
  console.log("hit");

  return (
    <div style={{ height: "10vh", margin: "1vh" }}>
      {file ? (
        <Card
          style={{
            color: "white",
            width: 150,
          }}
          cover={<img alt="example" src={file.image} />}
          bordered={false}
        >
          <Meta style={{ color: "white" }} title={file.title}>
            <p style={{ color: "white" }}>{file.title}</p>
          </Meta>
        </Card>
      ) : (
        <Card bordered={false} style={{ width: 200 }} loading={true} />
      )}
    </div>
  );
}

export default SongCard;
