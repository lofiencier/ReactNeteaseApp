import React from "react";
const Header = props => {
  return (
    <header>
      <div className="header">
        <div className="logo_header">
          <img src="" alt="" />
        </div>
        <Row type="flex" justify="start">
          <Col span={4} offset={1}>
            col-4
          </Col>
          <Col span={4}>col-4</Col>
          <Col span={4}>col-4</Col>
          <Col span={4}>col-4</Col>
        </Row>
      </div>
    </header>
  );
};

export default Header;
