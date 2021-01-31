import React, { useEffect, useState } from "react";
import { NavLink, useHistory, usHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import * as sessionProfileActions from "../../store/profile";
import * as sessionSongActions from "../../store/song";
import { Menu } from "antd";
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";
import "antd/dist/antd.css";
import "./index.css";
import { set } from "js-cookie";
const { SubMenu } = Menu;

function Playbar() {
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const sessionSongs = useSelector((state) => state.song.songs);
  const [audio, setAudio] = useState();
  const [render, setRender] = useState();

  function handleSongs(songsArr) {
    const playlist = [];
    const playableList = songsArr.forEach((song) => {
      playlist.push({ musicSrc: song });
    });
    console.log(playlist);
    setAudio(playlist);
  }

  return (
    <div style={{ position: "fixed", bottom: "0" }}>
      <button
        style={{
          marginBottom: "4.2vh",
          background: "rgb(22, 22, 23)",
          color: "rgba(255, 255, 255, 0.65)",
          borderColor: "#001529",
          float: "right",
        }}
      >
        Force Update
      </button>
      <ReactJkMusicPlayer
        audioLists={audio}
        showDownload={false}
        showReload={false}
        showLyric={false}
        toggleMode={false}
        showThemeSwitch={false}
        showPlayMode={false}
        responsive={false}
        mode={"full"}
        autoPlay={false}
      />
    </div>
  );
}

export default Playbar;
