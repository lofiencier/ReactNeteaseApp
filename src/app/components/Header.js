import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import LoginBox from "./loginbox";
import { Icon } from "antd";

@connect(store => {
  return {
    user: store.user
  };
})
export class Header extends React.Component {
  constructor() {
    super();
    // this.state={
    //   location:location
    // }
  }
  popUpLogin() {
    document.querySelectorAll(".loginbox_root_content")[0].style.display =
      "block";
  }
  submitHandler(e) {
    e = e || window.event;
    e.preventDefault();
    let target = e.currentTarget;
    let keywords = target.keywords.value;
    // console.log(keywords)
    let limit = target.limit.value;
    let type = target.type.value;
    // this.props.dispatch()
    location.assign(`#/search?keywords=${keywords}`);
  }
  componentWillReceiveProps(nextProps) {
    // console.log(location);
  }
  render() {
    var isLogin;
    if (localStorage.loged) {
      let avatarUrl = JSON.parse(localStorage.profile).avatarUrl;
      let uid = JSON.parse(localStorage.profile).userId;
      isLogin = (
        <a href={"#/mine"}>
          <img src={avatarUrl + "?param=28y28"} alt="" />
        </a>
      );
    } else {
      isLogin = (
        <a href="javascript:void(0)" onClick={this.popUpLogin}>
          <span>Login</span>
        </a>
      );
    }
    return (
      <header>
        <div className="header_fixed">
          <div className="header_content">
            <div className="logo">
              <h1>
                <Link to="/">NETEASE</Link>
              </h1>
            </div>
            <div className="header_nav_search">
              <span>
                <form method="GET" onSubmit={this.submitHandler.bind(this)}>
                  <input type="text" name="keywords" autoComplete="off" />
                  <input type="hidden" name="limit" value="20" />
                  <input type="hidden" name="type" value="" />
                  <input type="hidden" name="offset" value="" />
                </form>
              </span>
            </div>
            <div className="header_nav active">
              <a href="javascript:void(0)">DISCOVER</a>
            </div>
            <div className="header_nav">
              <a href="javascript:void(0)">MINE</a>
            </div>
            <div className="header_nav">
              <a href="javascript:void(0)">FM</a>
            </div>
            <div className="header_nav">
              <a href="javascript:void(0)">MV</a>
            </div>
            <div className="header_nav_login">{isLogin}</div>
          </div>
        </div>
        <LoginBox />
      </header>
    );
  }
}

const HeaderWithRouter = withRouter((history, location, match) => {
  return <Header />;
});

export default HeaderWithRouter;
