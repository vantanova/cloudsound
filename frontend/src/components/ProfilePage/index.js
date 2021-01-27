import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetch } from "../../store/csrf";
import { Layout, Row, Col, Upload, message, Input, Image } from "antd";
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

  useEffect(() => {
    profileFetch();
  }, []);

  return (
    <Layout style={{ background: "none", padding: "none" }}>
      <Layout
        style={{
          background: "none",
          padding: "none",
        }}
      >
        <Content
          style={{
            backgroundColor: "#edeeef",
            marginTop: "0px",
            maxWidth: "800px",
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
                width={"25%"}
                src={profileData.profilePicture}
                loading="true"
                preview="true"
                placeholder="true"
              ></Image>
            ) : (
              <Image
                style={{
                  margin: "25px",
                  zIndex: "2",
                  position: "absolute",
                }}
                width={"25%"}
                src={
                  "https://cloudsoundappbucket.s3-us-west-1.amazonaws.com/logo.png"
                }
                placeholder="true"
              ></Image>
            )}

            <Row>
              <Col span={8}></Col>
              <Col span={4}>
                <p> Hello </p>
              </Col>
            </Row>
          </div>
        </Content>
      </Layout>
      <Footer></Footer>
    </Layout>
  );
}

export default ProfilePage;
