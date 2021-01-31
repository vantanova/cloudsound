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
const { SubMenu } = Menu;

function Playbar() {
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const sessionSongs = useSelector((state) => state.song.songs);
  const [audio, setAudio] = useState();
  console.log(sessionSongs);
  console.log(sessionSongs);

  function handleSongs(songsArr) {
    const playlist = [];
    const playableList = songsArr.forEach((song) => {
      playlist.push({ musicSrc: song });
    });
    setAudio(playlist);
  }

  console.log(audio);

  const dispatch = useDispatch();
  let navLinks;
  let sessionLinks;

  return (
    <div style={{ position: "fixed", bottom: "0" }}>
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
