// frontend/src/components/LoginFormPage/index.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { message } from "antd";
import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  Select,
  DatePicker,
} from "antd";
import { Typography, Space } from "antd";

import "antd/dist/antd.css";
import "./LoginForm.css";

const { Text, Link } = Typography;
const { Option } = Select;

function LoginFormPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [drawer, setDrawer] = useState(true);

  if (sessionUser) return <Redirect to="/" />;

  const validateMessages = {
    required: `Username' is required!`,
    // ...
  };

  const showDrawer = () => {
    setDrawer(true);
  };

  const onClose = () => {
    setDrawer(false);
    history.goBack();
  };

  const formSubmission = () => {
    setDrawer(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      (res) => {
        console.log(res.data.errors);
        if (res.data && res.data.errors) setErrors(res.data.errors);
      }
    );
  };

  return (
    <div style={{ height: "100vh" }}>
      <Drawer
        title="Login to your account"
        width={"40vh"}
        onClose={onClose}
        closable={false}
        visible={drawer}
        bodyStyle={{ paddingBottom: 80 }}
        headerStyle={{
          backgroundColor: "rgb(22, 22, 23)",
          color: "rgba(255, 255, 255, 0.65)",
        }}
        style={{ color: "white" }}
        footer={
          <div
            style={{
              textAlign: "right",
            }}
          >
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              type="primary"
              style={{
                background: "rgb(22, 22, 23)",
                color: "rgba(255, 255, 255, 0.65)",
                borderColor: "#001529",
              }}
            >
              Login
            </Button>
          </div>
        }
      >
        <Form layout="vertical" hideRequiredMark onSubmit={handleSubmit}>
          <Row gutter={16}>
            <Col span={18}>
              <Form.Item
                name="name"
                label="Username or Email"
                rules={[
                  {
                    required: true,
                    message: "Please enter user name or an email.",
                  },
                ]}
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                required
              >
                <Input placeholder="Please enter user name or an email." />
              </Form.Item>
            </Col>
            <Col span={12}></Col>
          </Row>
          <Row gutter={16}>
            <Col span={18}>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  { required: true, message: "Please enter your password" },
                ]}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              >
                <Input placeholder="Please enter a password." />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Space direction="vertical">
                {errors.map((error, idx) => (
                  <Text type="danger" key={idx}>
                    {error}
                  </Text>
                ))}
              </Space>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </div>
    // <form style={{ marginTop: "100px" }} onSubmit={handleSubmit}>
    //   <ul>
    //     {errors.map((error, idx) => (
    //       <li key={idx}>{error}</li>
    //     ))}
    //   </ul>
    //   <label>
    //     Username or Email
    //     <input
    //       type="text"
    //       value={credential}
    //       onChange={(e) => setCredential(e.target.value)}
    //       required
    //     />
    //   </label>
    //   <label>
    //     Password
    //     <input
    //       type="password"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //       required
    //     />
    //   </label>
    //   <button type="submit">Log In</button>
    // </form>
  );
}

export default LoginFormPage;
