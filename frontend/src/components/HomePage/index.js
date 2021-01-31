import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as sessionProfileActions from "../../store/profile";
import { fetch } from "../../store/csrf";
import SongCard from "../SongCard";
import VideoHeader from "../VideoHeader";
import HomeDivider from "../HomeDivider";
import { Input, Row, Col } from "antd";
import "./index.css";
import "antd/dist/antd.css";

const { Search } = Input;

function HomePage() {
  const [data, setData] = useState();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const divData = ["Rock Music, "];
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
      <div style={{ height: "100vh", padding: "2vh", display: "flex" }}>
        {data &&
          data.homeFiles.map((file) => {
            return <SongCard file={file}></SongCard>;
          })}
      </div>
    </div>
  );
}

export default HomePage;
