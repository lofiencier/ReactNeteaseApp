import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import LoginBox from "./loginbox";
import { Icon, Dropdown, Menu } from "antd";
import { getCookie, delCookie, setCookie } from "../utils/common";
import { cookie_alive, toggleLoginBox, logout } from "../redux/actions";

@connect(store => {
  return {
    user: store.user
  };
})
export class Header extends React.Component {
  constructor() {
    super();
  }
  componentWillMount() {
    var _csrf = getCookie("__csrf");
    var profile = localStorage.getItem("profile");
    if (_csrf && profile) {
      this.props.dispatch(
        cookie_alive({
          loged: true,
          profile: JSON.parse(profile)
        })
      );
    }
  }
  popUpLogin() {
    console.log(">>>");
    this.props.dispatch(toggleLoginBox());
  }
  submitHandler(e) {
    e = e || window.event;
    e.preventDefault();
    let target = e.currentTarget;
    let keywords = target.keywords.value;
    // console.log(keywords)
    let limit = target.limit.value;
    let type = target.type.value;
    location.assign(`#/search?keywords=${keywords}`);
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props.history);
  }
  popProfile({ key }) {
    switch (key) {
      case "logout": {
        localStorage.setItem("loged", false);
        localStorage.removeItem("profile");
        delCookie("MUSIC_U");
        delCookie("__csrf");
        this.props.dispatch(logout());
        break;
      }
      case "collection": {
        location.assign(`#/mine`);
      }
    }
  }
  render() {
    const menu = (
      <Menu onClick={this.popProfile.bind(this)}>
        <Menu.Item key="collection">我的收藏</Menu.Item>
        <Menu.Item key="logout">注销</Menu.Item>
      </Menu>
    );
    const { pathname } = this.props.history.location;
    return (
      <header>
        <div
          className="header_fixed"
          style={this.props.user.showLogin ? { paddingRight: "17px" } : {}}
        >
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
            <div
              className={pathname === "/" ? "header_nav active" : "header_nav"}
            >
              <a href="#/">DISCOVER </a>
            </div>
            <div
              className={
                pathname === "/mine" ? "header_nav active" : "header_nav"
              }
            >
              <a href="#/mine">MINE</a>
            </div>
            <div
              className={
                pathname === "/fm" ? "header_nav active" : "header_nav"
              }
            >
              <a href="javascript:void(0)">FM</a>
            </div>
            <div
              className={
                pathname === "/mv" ? "header_nav active" : "header_nav"
              }
            >
              <a href="javascript:void(0)">MV</a>
            </div>
            <div className="header_nav_login">
              {this.props.user.loged ? (
                <Dropdown overlay={menu}>
                  <a href={"#/mine"} className="nav_drop_menu">
                    <img
                      src={this.props.user.profile.avatarUrl + "?param=28y28"}
                      alt=""
                    />
                    <Icon type="down" />
                  </a>
                </Dropdown>
              ) : (
                <a
                  href="javascript:void(0)"
                  onClick={this.popUpLogin.bind(this)}
                >
                  <span>Login</span>
                </a>
              )}
            </div>
          </div>
        </div>
        <LoginBox />
      </header>
    );
  }
}

const HeaderWithRouter = withRouter(({ history, location, match }) => {
  return <Header history={history} location={location} match={match} />;
});

export default HeaderWithRouter;
