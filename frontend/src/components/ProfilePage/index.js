import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { fetch } from "../../store/csrf";
import Header from "./header";

function ProfilePage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const userId = sessionUser.id;

  useEffect(() => {
    async function profileFetch() {
      const res = await fetch(`/api/profile/${userId}`);
      if (res.ok) {
        const data = await res.data;
        console.log(data);
      }
    }
    profileFetch();
  }, []);

  return (
    <div>
      <h1>Profile Page</h1>
      <Header></Header>
    </div>
  );
}

export default ProfilePage;
