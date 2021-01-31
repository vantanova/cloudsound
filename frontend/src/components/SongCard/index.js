import React from "react";
// import { NavLink } from "react-router-dom";
import * as sessionSongActions from "../../store/song";
import { useSelector, useDispatch } from "react-redux";
import "./index.css";
import { Card } from "antd";
const { Meta } = Card;

function SongCard({ file }) {
  const dispatch = useDispatch();

  function addToQueue() {
    console.log("hit");
    console.log(file.audio);
    dispatch(sessionSongActions.addSong(file.audio));
  }

  return (
    <div style={{ height: "10vh", margin: "1vh" }}>
      <button
        onClick={addToQueue}
        style={{ background: "none", border: "none" }}
      >
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
      </button>
    </div>
  );
}

export default SongCard;
