import React from "react";

export default class Header extends React.Component {
  render() {
    return (
      <header>
        <div className="header_fixed">
          <div className="header_content">
            <div className="logo">
              <h1>LOGO</h1>
            </div>
            <div className="header_nav_search">
              <a href="javascript:void(0)">
                <span>se</span>
              </a>
            </div>
            <div className="header_nav">
              <a href="javascript:void(0)">FM</a>
            </div>
            <div className="header_nav">
              <a href="javascript:void(0)">MINE</a>
            </div>
            <div className="header_nav">
              <a href="javascript:void(0)">ARTISTS</a>
            </div>
          </div>
        </div>
      </header>
    );
  }
}