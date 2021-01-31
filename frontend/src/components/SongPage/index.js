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

const { Option } = Select;
const { Dragger } = Upload;
const { Content, Footer } = Layout;

function SongPage() {
  return (
    <div style={{ height: "100vh", padding: "4vh" }}>
      <h1 style={{ color: "white" }}>Rock Music</h1>
    </div>
  );
}

export default SongPage;
