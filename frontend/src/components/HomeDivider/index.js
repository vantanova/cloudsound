import React, { useState, useEffect } from "react";
import { fetch } from "../../store/csrf";
import { Row, Col } from "antd";
import "antd/dist/antd.css";
import "./index.css";

function HomeDivider() {
  return (
    <>
      <Row>
        <Col span={16} className="contentbox">
          Content
        </Col>
        <Col span={8} className="contentbox">
          Image
        </Col>
      </Row>
      <Row>
        <Col className="contentbox" span={8}>
          col-8
        </Col>
        <Col span={8}>col-8</Col>
        <Col span={8}>col-8</Col>
      </Row>
      <Row>
        <Col span={6}>col-6</Col>
        <Col span={6}>col-6</Col>
        <Col span={6}>col-6</Col>
        <Col span={6}>col-6</Col>
      </Row>
    </>
  );
}

export default HomeDivider;
