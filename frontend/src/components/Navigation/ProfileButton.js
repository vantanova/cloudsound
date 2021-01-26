import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import "./Navigation.css";
import { Menu } from "antd";
import "antd/dist/antd.css";
const { SubMenu } = Menu;

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);

  console.log(sessionUser);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    // <>
    //   <button onClick={openMenu}>
    //     <i className="fas fa-user-circle" />
    //   </button>
    //   {showMenu && (
    //     <ul className="profile-dropdown">
    //       <li className="navlink">{user.username}</li>
    //       <li className="navlink">{user.email}</li>
    //       <li>
    //         <button onClick={logout}>Log Out</button>
    //       </li>
    //     </ul>
    //   )}
    // </>
    <>
      <SubMenu
        key="SubMenu"
        title={`${sessionUser.username}`}
        style={{ float: "right" }}
      >
        <Menu.Item key="setting:1"> Option </Menu.Item>
        <Menu.Item key="setting:2">
          <button onClick={logout}>Log Out</button>
        </Menu.Item>
      </SubMenu>
    </>
  );
}

export default ProfileButton;
