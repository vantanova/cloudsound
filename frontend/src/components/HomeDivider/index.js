import React, { useState, useEffect } from "react";
import { fetch } from "../../store/csrf";
import { Row, Col } from "antd";
import "antd/dist/antd.css";
import "./index.css";

function HomeDivider() {
  return (
    <>
      <Row>
        <Col span={24} className="contentbox">
          Content
        </Col>
      </Row>
    </>
  );
}

export default HomeDivider;
