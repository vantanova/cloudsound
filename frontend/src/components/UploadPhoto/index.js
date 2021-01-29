import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { fetch } from "../../store/csrf";
import { Col, Row, Modal, Button, Upload, message, Input } from "antd";
import {
  PlusOutlined,
  LoadingOutlined,
  UploadOutlined,
} from "@ant-design/icons";

import "antd/dist/antd.css";
const { TextArea } = Input;

function UploadPhoto({ data }) {
  const [imageLoading, setImageLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [file, setFile] = useState("");

  const sessionUser = useSelector((state) => state.session.user);
  const { loading, imageUrl } = imageLoading;
  const userId = sessionUser.id;

  function handleUpload(e) {
    setFile(e.target.files[0]);
    setImageLoading({
      imageUrl,
      loading: false,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file);
    profilePicturePost(`/api/profile/${userId}`, formData);
    setIsModalVisible(false);
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  async function profilePicturePost(url, insertFile) {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: insertFile,
    });
  }

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {}, []);

  const uploadButton = (
    <div>
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <label for="file">Choose:</label>
        <input type="file" name="file" onChange={handleUpload}></input>
      </form>
    </div>
  );

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  return (
    <>
      <Button type="text" onClick={showModal}>
        {data[0]}
      </Button>
      <Modal
        title="Upload a Photo"
        visible={isModalVisible}
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
        <Row>
          <Col span={6}>{uploadButton}</Col>
          <Col span={16} style={{ padding: "5px" }}>
            <p>Select a new {data[0]}.</p>
            <p>
              Please select a photo that is <br></br>
              less than 2mb and a jpeg/png.
            </p>
          </Col>
        </Row>
      </Modal>
    </>
  );
}

export default UploadPhoto;
