import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { fetch } from "../../store/csrf";
import { Col, Row, Modal, Button, Upload, message, Input } from "antd";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";

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
  console.log(file);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file);
    for (var value of formData.values()) {
      console.log("---------------------------", value);
    }
    profilePicturePost(`/api/profile/${userId}`, formData);
    setIsModalVisible(false);
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  async function profilePicturePost(url, insertFile) {
    insertFile["originalname"] = insertFile["name"];

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
          <Col span={6}>
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
              <input type="file" name="file" onChange={handleUpload}></input>
              {/* <button type="submit">Submit</button> */}
            </form>
          </Col>
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
