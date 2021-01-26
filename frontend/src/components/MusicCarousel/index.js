import React from "react";
import "antd/dist/antd.css";
import { Carousel } from "antd";
import "./Carousel.css";

function MusicCarousel() {
  const contentStyle = {
    height: "500px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
  };
  return (
    <Carousel autoplay autoplaySpeed={9000} fade={true}>
      <div>
        <h3 style={contentStyle}>
          <img
            className="CarouselImage"
            src="https://cloudsoundappbucket.s3-us-west-1.amazonaws.com/Tyler-the-Creator-IGOR.jpeg"
            alt="Tyler"
          ></img>
        </h3>
      </div>
      <div>
        <h3 style={contentStyle}>
          <img
            className="CarouselImage"
            src="https://cloudsoundappbucket.s3-us-west-1.amazonaws.com/favourite3.png"
            alt="Tyler"
          ></img>
        </h3>
      </div>
      <div>
        <h3 style={contentStyle}>
          <img
            className="CarouselImage"
            src="https://cloudsoundappbucket.s3-us-west-1.amazonaws.com/blond-grid.jpg"
            alt="Tyler"
          ></img>
        </h3>
      </div>
      <div>
        <h3 style={contentStyle}>
          <img
            className="CarouselImage"
            src="https://cloudsoundappbucket.s3-us-west-1.amazonaws.com/A1DgpEOSAnL._AC_SL1500_.jpg"
            alt="Tyler"
          ></img>
        </h3>
      </div>
    </Carousel>
  );
}

export default MusicCarousel;
