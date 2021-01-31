import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { fetch } from "../../store/csrf";
import { Layout, Row, Col, Upload, message, Input, Select, Button } from "antd";
import {
  PlusOutlined,
  LoadingOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import "./index.css";

const { Option } = Select;
const { Dragger } = Upload;
const { Content, Footer } = Layout;

function UploadPage() {
  let mostRecent;
  const [title, setTitle] = useState();
  const [select, setSelect] = useState();
  const [audioFile, setAudioFile] = useState();
  const [photoFile, setPhotoFile] = useState();
  const [photoImage, setPhotoImage] = useState();
  const [imageLoading, setImageLoading] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  const userId = sessionUser.id;

  async function songPost(url, songData) {
    const res = await fetch(url, {
      method: "POST",
      body: songData,
    });
  }

  async function songAudioPost(url, insertFile) {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: insertFile,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("hello");
    const data = { select, title };
    console.log(data);
    const formData = new FormData();
    formData.append("image", photoFile);
    // // formData.append("audio", audioFile);
    songPost(`/api/upload/`, JSON.stringify(data));
    songAudioPost(`/api/upload/`, formData);
  }

  function handleSelect(value) {
    setSelect(value);
  }

  function handleTitle(value) {
    setTitle(value.target.value);
  }

  function handleAudioFile(value) {
    mostRecent = value.file;
    setAudioFile(mostRecent);
  }

  async function handleSongPhoto(value) {
    setPhotoFile(value.file);
    console.log(value.file);
    const readURL = (file) => {
      return new Promise((res, rej) => {
        const reader = new FileReader();
        reader.onload = (e) => res(e.target.result);
        reader.onerror = (e) => rej(e);
        reader.readAsDataURL(file);
      });
    };
    const url = await readURL(value.file.originFileObj);
    setPhotoImage(url);
    setImageLoading(false);
  }

  const { loading, imageUrl } = imageLoading;
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const props = {
    name: "file",
    multiple: false,
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  };

  function onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  }

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  useEffect(() => {
    // profileFetch();
  }, []);

  return (
    <Layout
      className="layout"
      style={{ background: "none", height: "100vh", paddingBottom: "10vh" }}
    >
      <Content style={{ backgroundColor: "#edeeef", marginTop: "0px" }}>
        {/* <div className="site-layout-content">Content</div> */}
        <div
          className="header"
          style={{
            backgroundImage: `url("https://cloudsoundappbucket.s3-us-west-1.amazonaws.com/Default-Banner.png")`,
            backgroundSize: "cover",
            zIndex: "1",
            width: "100%",
            display: "flex",
            alignItems: "flex-end",
          }}
        >
          <h2
            style={{
              color: "white",
              marginLeft: "4vh",
              marginBottom: "2vh",
              fontSize: "2.5rem",
            }}
          >
            Upload a Song
          </h2>
        </div>
        <div className="centered">
          <div className="uploadBox">
            <Row>
              <Col span={14}>
                <h4>Song Title</h4>
                <Input onChange={handleTitle} value={title} size="large" />
              </Col>
              <Col span={4}></Col>
              <Col span={5}>
                <h4>Genre</h4>
                <Select
                  value={select}
                  style={{ width: 120 }}
                  onChange={handleSelect}
                >
                  <Option value="Rock">Rock</Option>
                  <Option value="Funk">Funk</Option>
                  <Option value="Pop">Pop</Option>
                  <Option value="Techno">Techno</Option>
                  <Option value="Country">Country</Option>
                  <Option value="Classical">Classical</Option>
                </Select>
              </Col>
            </Row>
            <Row>
              <Col span={3}></Col>
              <Col
                span={10}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-end",
                  height: "6vh",
                }}
              >
                <h3>Audio</h3>
              </Col>
              <Col span={3}></Col>
            </Row>
            <Row>
              <Col span={16}>
                <Dragger
                  customRequest={dummyRequest}
                  onChange={handleAudioFile}
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">Drag audio here</p>
                  <p className="ant-upload-hint">
                    Supported types are .mp3 and .ogg.
                  </p>
                </Dragger>
              </Col>
              <Col span={2}></Col>
              <Col style={{ display: "flex", alignItems: "center" }}>
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  customRequest={dummyRequest}
                  onChange={handleSongPhoto}
                >
                  {photoImage ? (
                    <img
                      src={photoImage}
                      alt="avatar"
                      style={{ width: "50%" }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <form encType="multipart/form-data" onSubmit={handleSubmit}>
                  <input type="file"></input>
                  <button
                    style={{
                      background: "rgb(22, 22, 23)",
                      color: "rgba(255, 255, 255, 0.65)",
                      borderColor: "#001529",
                      float: "right",
                      marginRight: "1.5vh",
                    }}
                    type="submit"
                  >
                    Upload Song
                  </button>
                </form>
              </Col>
            </Row>
          </div>
        </div>
      </Content>
    </Layout>
  );
}

export default UploadPage;
