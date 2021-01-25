import React, { useEffect } from "react";
import "./Header.css";

function Header({ data }) {
  console.log(data);

  useEffect(() => {});

  return (
    <div className="headerbox">
      <img
        className="banner"
        src="https://cloudsoundappbucket.s3-us-west-1.amazonaws.com/Default-Banner.png"
        alt="banner"
      ></img>
      <div className="row">
        <div className="column">
          <img
            src="https://cloudsoundappbucket.s3-us-west-1.amazonaws.com/logo.png"
            className="profilePicture"
            alt="Profile"
          ></img>
        </div>
        <div className="column"></div>
      </div>
    </div>
  );
}

export default Header;
