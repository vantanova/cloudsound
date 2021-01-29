import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { fetch } from "../../store/csrf";
import { Layout, Row, Col, Upload, message, Input } from "antd";
import {
  PlusOutlined,
  LoadingOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import "./index.css";

const { Dragger } = Upload;
const { Content, Footer } = Layout;

function UploadPage() {
  const [imageLoading, setImageLoading] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  const userId = sessionUser.id;
  console.log(userId);

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  function beforeUpload(file) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  }

  function handleChange(info) {
    if (info.file.status === "uploading") {
      setImageLoading({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) =>
        setImageLoading({
          imageUrl,
          loading: false,
        })
      );
    }
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

  useEffect(() => {
    // profileFetch();
  }, []);

  return (
    <Layout
      className="layout"
      style={{ background: "none", height: "100vh", paddingBottom: "10vh" }}
    >
      {" "}
      height: "100vh", paddingBottom: "10vh",
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
                <Input size="large" />
              </Col>
              <Col span={3}></Col>
              <Col
                span={6}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                >
                  {imageUrl ? (
                    <img src={imageUrl} alt="avatar" style={{ width: "50%" }} />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </Col>
            </Row>
            <Row>
              <Col span={3}></Col>
              <Col
                span={10}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <h3>Audio</h3>
              </Col>
              <Col span={3}></Col>
            </Row>
            <Row>
              <Col span={16}>
                <Dragger {...props} onChange={onChange}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">Drag audio here</p>
                  <p className="ant-upload-hint">
                    Supported types are .mp3 and .ogg.
                  </p>
                </Dragger>
              </Col>
              <Col span={3}></Col>
            </Row>
          </div>
        </div>
      </Content>
    </Layout>
  );
}

export default UploadPage;
