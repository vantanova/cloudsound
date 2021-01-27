import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { fetch } from "../../store/csrf";
import { Col, Row, Modal, Button, Upload, message, Input } from "antd";
import {
  PlusOutlined,
  LoadingOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";

const { Dragger } = Upload;

function UploadPhoto({ data }) {
  const [imageLoading, setImageLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
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
      console.log(info);
      getBase64(info.file.originFileObj, (imageUrl) =>
        setImageLoading({
          imageUrl,
          loading: false,
        })
      );
    }
  }
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

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

  useEffect(() => {
    // profileFetch();
  }, []);

  return (
    <>
      <Button type="text" onClick={showModal}>
        {data[0]}
      </Button>
      <Modal
        title="Upload a Photo"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Row>
          <Col span={6}>
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
