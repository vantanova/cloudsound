import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

function Header() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div>
      <img></img>
    </div>
  );
}

export default Header;
