import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetch } from "../../store/csrf";
import ProfileHeader from "./header";
import "antd/dist/antd.css";
import { Layout } from "antd";
import "./Header.css";
const { Header, Footer, Sider, Content } = Layout;

function ProfilePage() {
  let history = useHistory();
  const [data, setData] = useState();
  const sessionUser = useSelector((state) => state.session.user);

  const userId = sessionUser.id;

  async function profileFetch() {
    const res = await fetch(`/api/profile/${userId}`);
    if (res.ok) {
      let data = await res.data;
      setData(data);
    }
  }

  useEffect(() => {
    profileFetch();
  }, []);

  return (
    <div className="layout">
      {/* <ProfileHeader data={data}></ProfileHeader> */}
      <Layout>
        <Layout>
          <Content>
            <div>
              <p>Hello</p>
            </div>
          </Content>
        </Layout>
        <Footer></Footer>
      </Layout>
    </div>
  );
}

export default ProfilePage;
