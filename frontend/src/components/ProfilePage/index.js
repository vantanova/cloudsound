import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetch } from "../../store/csrf";
import { EditOutlined } from "@ant-design/icons";
import Waveform from "../WaveForm/index";
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
import "./Header.css";
import "antd/dist/antd.css";

function ProfilePage() {
  const { Header, Footer, Sider, Content } = Layout;
  let history = useHistory();
  const [data, setData] = useState();
  const sessionUser = useSelector((state) => state.session.user);
  let username;
  let profileData;

  const userId = sessionUser.id;

  async function profileFetch() {
    const res = await fetch(`/api/profile/${userId}`);
    if (res.ok) {
      let data = await res.data;
      setData(data);
    }
  }

  if (data) {
    username = data.userFiles[0].username;
    profileData = data.userFiles[0].Profile;
    if (profileData.profilePicture === "default") {
      profileData.profilePicture =
        "https://cloudsoundappbucket.s3-us-west-1.amazonaws.com/logo.png";
    }
    console.log(profileData);
  }

  const menu = (
    <Menu>
      <Menu.Item icon={<EditOutlined />}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://www.alipay.com/"
        >
          Profile Photo
        </a>
      </Menu.Item>
      <Menu.Item icon={<EditOutlined />}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://www.taobao.com/"
        >
          Header Photo
        </a>
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    profileFetch();
  }, []);

  return (
    <Layout style={{ background: "none", padding: "none" }}>
      <Layout
        style={{
          background: "none",
          padding: "none",
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
        height={1000}
      >
        <Content
          width={1000}
          style={{
            backgroundColor: "#edeeef",
            marginTop: "0px",
          }}
        >
          <div
            className="header"
            style={{
              backgroundImage: `url("https://cloudsoundappbucket.s3-us-west-1.amazonaws.com/Default-Banner.png")`,
              backgroundSize: "cover",
              position: "relative",
              zIndex: "1",
            }}
          >
            {data ? (
              <Image
                style={{
                  margin: "25px",
                  zIndex: "2",
                  position: "absolute",
                }}
                width={"200px"}
                src={profileData.profilePicture}
                loading="true"
                preview="false"
                placeholder="true"
              ></Image>
            ) : (
              <Image
                style={{
                  margin: "25px",
                  zIndex: "2",
                  position: "absolute",
                }}
                preview="false"
                width={"200px"}
                src={
                  "https://cloudsoundappbucket.s3-us-west-1.amazonaws.com/logo.png"
                }
                placeholder="true"
              ></Image>
            )}
            <Row>
              <Col
                span={23}
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Dropdown overlay={menu} placement="bottomCenter">
                  <Button
                    style={{
                      background: "rgb(22, 22, 23)",
                      color: "rgba(255, 255, 255, 0.65)",
                      borderColor: "#001529",
                    }}
                  >
                    Edit
                  </Button>
                </Dropdown>
              </Col>
            </Row>
            <Row className="title">
              <Col span={24}>
                {data ? <h1>{username}</h1> : <Skeleton paragraph={false} />}
              </Col>
            </Row>
          </div>

          <Row>
            <Col span={8} style={{ height: "7rem" }}></Col>
            <Col span={16} style={{ paddingRight: "10px" }}>
              <div
                style={{
                  height: "10rem",
                  backgroundColor: "rgb(22, 22, 23)",
                  borderRadius: "15px",
                  paddingLeft: "10px",
                  marginTop: "10px",
                }}
              >
                <Waveform></Waveform>
              </div>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
}

export default ProfilePage;
