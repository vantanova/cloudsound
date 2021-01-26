import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import { Menu } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import "antd/dist/antd.css";
const { SubMenu } = Menu;

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <>
        <Menu.Item key="setting:1">
          <NavLink to="/login">Log In</NavLink>
        </Menu.Item>
        <Menu.Item key="setting:2">
          <NavLink to="/signup">Sign Up</NavLink>
        </Menu.Item>
      </>
    );
  }

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    // <div>
    //   <ul className="navbar">
    //     <li className="logoText">
    //       <h1>CloudSound</h1>
    //     </li>
    //     <li>
    //       <NavLink className="navlink" exact to="/">
    //         Home
    //         {/* <Button>Home</Button> */}
    //       </NavLink>
    //       {sessionUser && (
    //         <NavLink className="navlink" to="/profile">
    //           {/* <Button>Profile</Button> */}
    //           Profile
    //         </NavLink>
    //       )}
    //       {sessionUser && (
    //         <NavLink className="navlink" to="/upload">
    //           {/* <Button type="primary">Upload</Button> */}
    //           Upload
    //         </NavLink>
    //       )}
    //     </li>
    //     <li>{isLoaded && sessionLinks}</li>
    //   </ul>
    // </div>

    <div>
      <Menu mode="horizontal" theme="dark" style={{ background: "#161617" }}>
        <Menu.Item key="Logo" style={{ width: 200 }}>
          <NavLink exact to="/">
            CloudSound
          </NavLink>
        </Menu.Item>

        <Menu.Item key="Home">
          <NavLink exact to="/">
            Home
          </NavLink>
        </Menu.Item>

        <Menu.Item key="Profile">
          <NavLink to="/profile">Profile</NavLink>
        </Menu.Item>

        <Menu.Item key="Upload">
          <NavLink to="/upload">Upload</NavLink>
        </Menu.Item>

        {sessionUser ? (
          <SubMenu
            key="SubMenu"
            title={sessionUser.username}
            style={{ float: "right" }}
          >
            <Menu.Item key="setting:1">{sessionUser.email}</Menu.Item>
            <Menu.Item key="setting:2">
              <p onClick={logout}>Log Out</p>
            </Menu.Item>
          </SubMenu>
        ) : (
          <SubMenu
            key="SubMenu"
            title="Signup / Login"
            style={{ float: "right" }}
          >
            {isLoaded && sessionLinks}
          </SubMenu>
        )}
      </Menu>
    </div>
  );
}

export default Navigation;
