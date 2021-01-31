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
  let songs;
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const sessionSongs = useSelector((state) => state.song.songs);
  const [audio, setAudio] = useState();
  const [render, setRender] = useState();

  async function handleClick() {
    songs = sessionSongActions.getSongs();
    console.log(songs);
  }

  function handleSongs() {
    const playlist = [];
    const playableList = songs.forEach((song) => {
      console.log(song.image);
      playlist.push({
        musicSrc: song.audio,
        cover: song.image,
        name: song.title,
      });
    });
    console.log(playlist);
    setAudio(playlist);
  }

  return (
    <div style={{ position: "fixed", bottom: "0" }}>
      <button
        onClick={handleClick}
        style={{
          marginBottom: "8vh",
          background: "rgb(22, 22, 23)",
          color: "rgba(255, 255, 255, 0.65)",
          borderColor: "#001529",
        }}
      >
        Add To Queue
      </button>
      <button
        onClick={handleSongs}
        style={{
          marginBottom: "8vh",
          background: "rgb(22, 22, 23)",
          color: "rgba(255, 255, 255, 0.65)",
          borderColor: "#001529",
        }}
      >
        Update Audio
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
