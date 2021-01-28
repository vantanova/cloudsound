import React from "react";
import "./index.css";

function VideoHeader() {
  return (
    <div style={{ position: "relative" }}>
      <video
        loop="loop"
        muted
        autoPlay="autoplay"
        width="100%"
        duration="5"
        style={{ position: "relative" }}
      >
        <source
          src="https://cloudsoundappbucket.s3-us-west-1.amazonaws.com/Pexels+Videos+2792967.mp4"
          type="video/mp4"
        />
      </video>
      <div
        style={{
          color: "white",
          position: "absolute",
          zIndex: "100",
          marginTop: "-50%",
          marginLeft: "30%",
        }}
      >
        <h1
          style={{
            fontSize: "5rem",
            color: "white",
            margin: "none",
          }}
        >
          CloudSound
        </h1>
        <p
          style={{
            fontSize: "2rem",
            color: "white",
            marginTop: "-40px",
            paddingLeft: "10px",
          }}
        >
          Easier music
        </p>
      </div>
    </div>
  );
}

export default VideoHeader;
