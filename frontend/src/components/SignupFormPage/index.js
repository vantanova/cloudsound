import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";
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
import "../LoginFormPage/LoginForm.css";
const { Text, Link } = Typography;

function SignupFormPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [drawer, setDrawer] = useState(true);
  const { Option } = Select;

  if (sessionUser) return <Redirect to="/" />;

  const onClose = () => {
    setDrawer(false);
    history.goBack();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(
        sessionActions.signup({ email, username, password })
      ).catch((res) => {
        if (res.data && res.data.errors) setErrors(res.data.errors);
      });
    }
    return setErrors([
      "Confirm Password field must be the same as the Password field",
    ]);
  };

  return (
    <div style={{ height: "100vh" }}>
      <Drawer
        title="Create a new account"
        closable={false}
        width={720}
        onClose={onClose}
        visible={drawer}
        bodyStyle={{ paddingBottom: 80 }}
        headerStyle={{
          backgroundColor: "rgb(22, 22, 23)",
          color: "rgba(255, 255, 255, 0.65)",
        }}
        footer={
          <div
            style={{
              textAlign: "right",
            }}
          >
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} type="primary">
              Submit
            </Button>
          </div>
        }
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, message: "Please enter an email" }]}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              >
                <Input placeholder="Please enter an email" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="username"
                label="Username"
                rules={[{ required: true, message: "Please enter a username" }]}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              >
                <Input placeholder="Please enter a username" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  { required: true, message: "Please enter your password" },
                ]}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              >
                <Input placeholder="Please enter your password" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="confirm"
                label="Confirm Password"
                rules={[{ required: true, message: "Please enter a password" }]}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              >
                <Input placeholder="Please enter a password" />
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
    // <form onSubmit={handleSubmit} style={{ backgroundColor: "white" }}>
    //   <ul>
    //     {errors.map((error, idx) => (
    //       <li stlye={{ color: "white" }} key={idx}>
    //         {error}
    //       </li>
    //     ))}
    //   </ul>
    //   <label>
    //     Email
    //     <input
    //       type="text"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //       required
    //     />
    //   </label>
    //   <label>
    //     Username
    //     <input
    //       type="text"
    //       value={username}
    //       onChange={(e) => setUsername(e.target.value)}
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
    //   <label>
    //     Confirm Password
    //     <input
    //       type="password"
    //       value={confirmPassword}
    //       onChange={(e) => setConfirmPassword(e.target.value)}
    //       required
    //     />
    //   </label>
    //   <button type="submit">Sign Up</button>
    // </form>
  );
}

export default SignupFormPage;
