import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { fetch } from "../../store/csrf";
import MusicCarousel from "../MusicCarousel";
import SongCard from "../SongCard";
import VideoHeader from "../VideoHeader";
import {
  Layout,
  Row,
  Col,
  Upload,
  message,
  Input,
  Image,
  Button,
  Menu,
  Dropdown,
  Skeleton,
} from "antd";
import "antd/dist/antd.css";

function HomePage() {
  const [data, setData] = useState();
  const sessionUser = useSelector((state) => state.session.user);
  if (sessionUser) {
    const userId = sessionUser.id;
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
    <div>
      <VideoHeader></VideoHeader>
      <p style={{ color: "white" }}>Hello</p>
    </div>
  );
}

export default HomePage;
