import React from "react";
import { connect } from "react-redux";
import { login, getCollect } from "../redux/actions";

let style1 = {
  width: "100px",
  height: "100px",
  listStyle: "none"
};

@connect(store => {
  return {
    user: store.user
  };
})
export default class Test extends React.Component {
  constructor() {
    super();
    this.submitHandler = this.submitHandler.bind(this);
    this.getPlaylist = this.getPlaylist.bind(this);
  }

  submitHandler(e) {
    e.preventDefault();
    console.log(e.currentTarget);
    let form1 = e.currentTarget;
    let phone = form1.querySelector("#phone_number").value;
    let password = form1.querySelector("#phone_password").value;
    this.props.dispatch(login(phone, password));
  }

  getPlaylist(e) {
    const uid = e.currentTarget.getAttribute("data-id");
    this.props.dispatch(getCollect(uid));
  }

  render() {
    if (!this.props.user.isLoged) {
      return (
        <form onSubmit={this.submitHandler} className="root_content search">
          <label htmlFor="phone">手机号</label>
          <input type="text" name="phone" id="phone_number" />
          <br />
          <label htmlFor="password">密码</label>
          <input type="password" name="password" id="phone_password" />
          <input type="submit" />
        </form>
      );
    } else {
      return (
        <div className="root_content search">
          <img
            src={this.props.user.avatarImgURL}
            style={{ width: "80px", height: "auto" }}
          />
          <br />
          <span>
            <a href={"/#/user?id=" + this.props.user.userId}>
              {this.props.user.nickname}
            </a>
          </span>
          <br />
          <span>{this.props.user.signature}</span>
          <button data-id={this.props.user.userId} onClick={this.getPlaylist}>
            我的歌单
          </button>
          <Collection favourite={this.props.user.collection} />
        </div>
      );
    }
  }
}

const Collection = props => {
  const lis = props.favourite.map(item => (
    <li key={item.playlistId}>
      <a href={"/#/playlist?id=" + item.playlistId} data-id={item.playlistId}>
        <img src={item.coverImgUrl} style={style1} />
        <span>{item.playlistName}</span>
        <i>
          <small>COUNT:{item.trackCount}</small>
        </i>
      </a>
    </li>
  ));
  return <ul>{lis}</ul>;
};
