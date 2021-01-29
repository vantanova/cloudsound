import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";
import * as sessionProfileActions from "../../store/profile";
import { fetch } from "../../store/csrf";
import { EditOutlined } from "@ant-design/icons";
import Waveform from "../WaveForm/index";
import {
  Layout,
  Row,
  Col,
  Image,
  Button,
  Menu,
  Dropdown,
  Skeleton,
  Input,
} from "antd";
import "./Header.css";
import "antd/dist/antd.css";
import UploadPhoto from "../UploadPhoto";
const { TextArea } = Input;

function ProfilePage() {
  const { Content } = Layout;
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const [edit, setEdit] = useState(false);
  const [username, setUsername] = useState();
  const [profileData, setProfileData] = useState();
  const [bio, setBio] = useState("");
  const sessionUser = useSelector((state) => state.session.user);
  const sessionProfile = useSelector((state) => state.profile);
  let profileDataBefore;
  let sessionProfileData;

  if (sessionProfile) {
    profileDataBefore = sessionProfile.profile.userFiles[0].username;
    sessionProfileData = sessionProfile.profile.userFiles[0].Profile;
  }

  if (profileData) {
    if (profileData.profilePicture === "default") {
      profileData.profilePicture =
        "https://cloudsoundappbucket.s3-us-west-1.amazonaws.com/logo.png";
    }
    if (profileData.bio === "default") {
      profileData.bio = "Welcome to my page!";
    }
  }

  function onBioChange(e) {
    setBio(e.target.value);
  }

  function onBioClick() {
    if (edit) setEdit(false);
    if (!edit) setEdit(true);
  }

  function handleSubmit(e) {
    e.preventDefault();
    profileBioUpdate(`/api/profile/${sessionUser.id}`, bio);
  }

  async function profileBioUpdate(url, text) {
    const res = await fetch(url, {
      method: "PUT",
      body: JSON.stringify({
        text,
      }),
    });
  }

  useEffect(() => {
    setUsername(profileDataBefore);
    setProfileData(sessionProfileData);
  }, []);

  const menu = (
    <Menu>
      <Menu.Item icon={<EditOutlined />}>
        <UploadPhoto data={["Profile Photo"]}></UploadPhoto>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout
      style={{
        background: "none",
        padding: "none",
        height: "90vh",
      }}
    >
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
            {profileData ? (
              <Image
                style={{
                  zIndex: "2",
                  position: "absolute",
                  marginLeft: "1vh",
                  marginTop: "4vh",
                }}
                width={"10rem"}
                src={profileData.profilePicture}
                loading="true"
                preview="false"
                placeholder="true"
              ></Image>
            ) : (
              <Image
                style={{
                  zIndex: "2",
                  position: "absolute",
                  marginLeft: "1vh",
                  marginTop: "4vh",
                }}
                preview="false"
                width={"10rem"}
                src={
                  "https://cloudsoundappbucket.s3-us-west-1.amazonaws.com/logo.png"
                }
                placeholder="true"
              ></Image>
            )}
            <Row>
              <Col
                span={23}
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Dropdown overlay={menu} placement="bottomCenter">
                  <Button
                    style={{
                      background: "rgb(22, 22, 23)",
                      color: "rgba(255, 255, 255, 0.65)",
                      borderColor: "#001529",
                      marginTop: "3rem",
                    }}
                  >
                    Edit
                  </Button>
                </Dropdown>
              </Col>
            </Row>
            <Row className="title">
              <Col span={24}>
                {profileData ? (
                  <h1>{username}</h1>
                ) : (
                  <Skeleton paragraph={false} />
                )}
              </Col>
            </Row>
          </div>

          <Row>
            <Col
              span={8}
              style={{
                height: "10rem",
                marginTop: "4vh",
                paddingLeft: "30px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h5>About Me</h5>
                <Button
                  type="dashed"
                  shape="circle"
                  icon={<EditOutlined />}
                  onClick={onBioClick}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: "15px",
                    background: "none",
                  }}
                ></Button>
              </div>
              {edit ? (
                <>
                  <TextArea
                    onChange={onBioChange}
                    style={{ width: "90%" }}
                    rows={4}
                  />
                  <Button
                    style={{
                      backgroundColor: "rgb(22, 22, 23)",
                      color: "rgba(255, 255, 255, 0.65)",
                      float: "right",
                      marginRight: "10%",
                    }}
                    onClick={handleSubmit}
                  >
                    Change Bio
                  </Button>
                </>
              ) : (
                profileData && <p>{profileData.bio}</p>
              )}
            </Col>
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
