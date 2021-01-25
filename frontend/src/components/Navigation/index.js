import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

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
        </li>
        <li>{isLoaded && sessionLinks}</li>
      </ul>
      <hr></hr>
    </div>
  );
}

export default Navigation;
