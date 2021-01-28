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

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  //   function handleChange(info) {
  //     if (info.file.status === "uploading") {
  //       setImageLoading({ loading: true });
  //       return;
  //     }
  //     if (info.file.status === "done") {
  //       setFile(info.file);
  //       getBase64(info.file.originFileObj, (imageUrl) =>
  //         setImageLoading({
  //           imageUrl,
  //           loading: false,
  //         })
  //       );
  //     }
  //   }
  function handleUpload(e) {
    setFile(e.target.files[0]);
    setImageLoading({
      imageUrl,
      loading: false,
    });
  }

  function handleSubmit(e) {
    const formData = new FormData();
    console.log(formData);
    formData.append("file", file);
    profilePicturePost(`/api/profile/${userId}`, formData);
    setIsModalVisible(false);
  }

  // console.log(imageUrl);

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    profilePicturePost(`/api/profile/${userId}`, file);
  };

  function dummyRequest({ imageUrl, onSuccess }) {
    setTimeout(() => {
      onSuccess("OK");
    }, 0);
  }

  async function profilePicturePost(url, insertFile) {
    console.log(insertFile);

    const res = await fetch(url, {
      method: "POST",
      body: insertFile,
    });
    if (res.ok) {
      return await res.data;
    }
  }

  const handleCancel = () => {
    setIsModalVisible(false);
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
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
        <Row>
          <Col span={6}>
            {/* <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              onChange={handleUpload}
              customRequest={dummyRequest}
              type="file"
            >
              {imageUrl ? (
                <img src={imageUrl} alt="avatar" style={{ width: "50%" }} />
              ) : (
                uploadButton
              )}
            </Upload> */}
            <input type="file" onChange={handleUpload}></input>
            {imageUrl ? (
              <img src={imageUrl} alt="avatar" style={{ width: "50%" }} />
            ) : (
              uploadButton
            )}
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
