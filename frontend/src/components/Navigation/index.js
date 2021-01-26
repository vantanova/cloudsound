import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "antd";
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
        <li>
          <NavLink className="navlink" exact to="/">
            Home
          </NavLink>
          {sessionUser && (
            <NavLink className="navlink" to="/profile">
              Profile
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
