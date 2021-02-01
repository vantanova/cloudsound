import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
import * as sessionSongActions from "../../store/song";
import { useSelector, useDispatch } from "react-redux";
import { fetch } from "../../store/csrf";
import "./index.css";
import {
  Card,
  Popover,
  Button,
  Drawer,
  Comment,
  Avatar,
  Form,
  List,
  Input,
  Tooltip,
} from "antd";
const { Meta } = Card;
const { TextArea } = Input;

function SongCard({ file }) {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState();
  const [display, setDisplay] = useState();
  const sessionUser = useSelector((state) => state.session.user);
  let comments;
  let commentContent;

  async function onSubmit(e) {
    console.log(file.id);
    const fileId = file.id;
    console.log(sessionUser.id);
    const userId = sessionUser.id;
    e.preventDefault();
    console.log(value);

    const returnObj = { fileId, userId, value };

    songPost(`/api/comments`, returnObj);
  }

  async function songPost(url, songData) {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(songData),
    });
    console.log(res);
  }

  function onChange(e) {
    setValue(e.target.value);
    console.log(value);
  }
  let commentArr;

  async function onButton() {
    comments = await fetch(`/api/comments/${file.id}`);
    commentArr = comments.data.homeFiles;
    setDisplay(commentArr);
    console.log(display);

    setVisible(true);
  }

  const onClose = () => {
    setVisible(false);
  };

  function addToQueue() {
    dispatch(sessionSongActions.addSong(file));
  }

  const content = (
    <div>
      <Button type="link" onClick={onButton}>
        <p style={{ color: "black" }}>Leave a comment?</p>
      </Button>
      <Drawer
        title={`Leave a comment on ${file.title}`}
        placement="bottom"
        closable={false}
        onClose={onClose}
        visible={visible}
        zIndex={10001}
        height="75%"
        headerStyle={{
          backgroundColor: "rgb(22, 22, 23)",
        }}
      >
        <form>
          <TextArea rows={4} onChange={onChange} value={value} />
          <button
            onClick={onSubmit}
            type="submit"
            style={{
              float: "right",
              background: "rgb(22, 22, 23)",
              color: "rgba(255, 255, 255, 0.65)",
              borderColor: "#001529",
            }}
          >
            Add Comment
          </button>
        </form>
        {display &&
          display.map((comment) => {
            return (
              <Comment>
                <p>{comment.body}</p>
              </Comment>
            );
          })}
      </Drawer>
    </div>
  );

  return (
    <div style={{ height: "22vh", margin: "1vh" }}>
      <button
        onClick={addToQueue}
        style={{ background: "none", border: "none" }}
      >
        {file ? (
          <Card
            style={{
              color: "white",
              width: 150,
            }}
            cover={
              <img alt="example" src={file.image} style={{ height: 150 }} />
            }
            bordered={false}
          >
            <Popover placement="bottom" content={content}>
              <Meta style={{ color: "white" }} title={file.title}>
                <p style={{ color: "white" }}>{file.title}</p>
              </Meta>
            </Popover>
          </Card>
        ) : (
          <Card bordered={false} style={{ width: 200 }} loading={true} />
        )}
      </button>
    </div>
  );
}

export default SongCard;
