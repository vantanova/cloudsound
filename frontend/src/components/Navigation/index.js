import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import "antd/dist/antd.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <>
        <NavLink className="navlink" to="/login">
          Log In
        </NavLink>
        <NavLink className="navlink" to="/signup">
          Sign Up
        </NavLink>
      </>
    );
  }

  return (
    <div>
      <ul className="navbar">
        <li className="logoText">
          <h1>CloudSound</h1>
        </li>
        <li>
          <NavLink className="navlink" exact to="/">
            <Button>Home</Button>
          </NavLink>
          {sessionUser && (
            <NavLink className="navlink" to="/profile">
              <Button>Profile</Button>
            </NavLink>
          )}
          {sessionUser && (
            <NavLink className="navlink" to="/upload">
              <Button type="primary">Upload</Button>
            </NavLink>
          )}
        </li>
        <li>{isLoaded && sessionLinks}</li>
      </ul>
      <hr></hr>
    </div>
  );
}

export default Navigation;
