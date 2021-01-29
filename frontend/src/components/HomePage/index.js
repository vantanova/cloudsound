import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as sessionProfileActions from "../../store/profile";
import { fetch } from "../../store/csrf";
import SongCard from "../SongCard";
import VideoHeader from "../VideoHeader";
import { Input } from "antd";
import "./index.css";
import "antd/dist/antd.css";

const { Search } = Input;

function HomePage() {
  const [data, setData] = useState();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  if (sessionUser) {
    const userId = sessionUser.id;
    dispatch(sessionProfileActions.profilePageFetch(userId));
  }

  async function homepageFetch() {
    const res = await fetch(`/api/`);
    if (res.ok) {
      let data = await res.data;
      console.log(data);
      setData(data);
    }
  }

  useEffect(() => {
    homepageFetch();
  }, []);

  return (
    <div style={{ height: "100%" }}>
      <VideoHeader></VideoHeader>
      <SongCard data={data}></SongCard>
    </div>
  );
}

export default HomePage;
