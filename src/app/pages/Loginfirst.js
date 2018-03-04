import React from "react";

export class Loginfirst extends React.Component {
  render() {
    return (
      <div className="login_first">
        <img
          src="static/images/empty.png"
          alt=""
          style={{ marginTop: "-200px", marginLeft: "-100px" }}
        />
        <p style={{ fontSize: "16px", color: "#e3e3e3" }}>请先登陆</p>
      </div>
    );
  }
}

export class NonMatch extends React.Component {
  render() {
    return (
      <div className="login_first">
        <img
          src="static/images/empty.png"
          alt=""
          style={{ marginTop: "-200px", marginLeft: "-100px" }}
        />
        <p style={{ fontSize: "16px", color: "#e3e3e3" }}>无此页面</p>
      </div>
    );
  }
}
