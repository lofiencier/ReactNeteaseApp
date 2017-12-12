import React from "react";
import { connect } from "react-redux";
import { setCookie, getCookie, delCookie } from "../utils/cookies";
import { cookie_alive } from "../redux/actions";

@connect(store => {
  return {
    user: store.user
  };
})
export default class loginbox extends React.Component {
  constructor() {
    super();
  }

  loginHandler(e) {
    e = e || window.event;
    e.preventDefault();
    let cellphone = e.currentTarget.cellphone.value;
    let password = e.currentTarget.password.value;
    fetch(
      `//localhost:3000/login/cellphone?phone=${cellphone}&password=${password}`,
      { method: "GET", mode: "cros", credentials: "true" }
    )
      .then(res => res.json())
      .then(data => {
        let { profile } = data;
        localStorage.setItem("profile", JSON.stringify(profile));
        localStorage.setItem("loged", true);
      });
  }
  componentWillMount() {
    let MUSIC_U = getCookie("MUSIC_U");
    console.log(MUSIC_U);
    if (localStorage.loged === "true" && MUSIC_U) {
      this.props.dispatch(cookie_alive());
    }
  }
  render() {
    return (
      <div
        className="loginbox_root_content"
        style={
          this.props.user.showBox ? { display: "block" } : { display: "none" }
        }
      >
        <div className="loginbox_wrap">
          <form onSubmit={this.loginHandler}>
            <label htmlFor="cellphone">PHONE</label>
            <input type="text" autoComplete="off" name="cellphone" />
            <br />
            <label htmlFor="password">PASSWORD</label>
            <input type="password" name="password" />
            <br />
            <input type="radio" name="remember" />
            <label htmlFor="remember">Remember</label>
            <input type="submit" value="SUBMIT" />
          </form>
        </div>
      </div>
    );
  }
}
