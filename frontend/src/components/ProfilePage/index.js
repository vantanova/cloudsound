import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { fetch } from "../../store/csrf";
import Header from "./header";

function ProfilePage() {
  const [data, setData] = useState();
  const sessionUser = useSelector((state) => state.session.user);
  const userId = sessionUser.id;
  async function profileFetch() {
    const res = await fetch(`/api/profile/${userId}`);
    if (res.ok) {
      let data = await res.data;
      setData(data);
    }
  }

  useEffect(() => {
    profileFetch();
  }, []);

  return (
    <div>
      <Header data={data}></Header>
    </div>
  );
}

export default ProfilePage;
