import React from "react";
import { connect } from "react-redux";
import { ListFloat } from "../components/common";
import {
  unshiftSong,
  pushSong,
  coverList,
  toggleLoginBox
} from "../redux/actions";
import { Button, Icon, Spin } from "antd";

const fetchConfig = {
  withCredentials: true
};

@connect(store => {
  return {
    user: store.user
  };
})
export default class Day extends React.Component {
  constructor() {
    super();
    this.state = {
      view: [],
      list: []
    };
    this.fetchList.bind(this);
  }
  componentWillMount() {
    if (this.props.user.loged) {
      this.fetchList();
    }
  }
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.user.loged &&
      nextProps.user.loged !== this.props.user.loged
    ) {
      this.fetchList();
    }
  }
  fetchList() {
    var _this = this;
    axios.get(`/recommend/songs`, fetchConfig).then(({ data }) => {
      console.log(data);
      data = data.recommend;
      data = data.map(i => {
        let { duration } = i;
        duration =
          parseInt(duration / 1000 / 60).toString() +
          ":" +
          (((duration / 1000) % 60) / 100)
            .toString()
            .split("")
            .slice(2, 4)
            .join("");
        return { ...i, duration };
      });
      _this.setState({ list: data });
      // let {name,id,duration,artist,album}
    });
  }
  playAllHandler() {
    this.props.dispatch(coverList(this.state.list));
  }
  playSong(song) {
    this.props.dispatch(unshiftSong(song));
  }
  goLogin() {
    this.props.dispatch(toggleLoginBox());
  }
  addSong(song) {
    this.props.dispatch(pushSong(song));
  }
  downSong() {}
  render() {
    let { loged } = this.props.user;
    var lis = [];
    if (this.state.list.length != 0) {
      // this.setState();
      lis = (
        <ListFloat
          noHead={true}
          songs={this.state.list}
          downSong={this.downSong.bind(this)}
          addSong={this.addSong.bind(this)}
          playSong={this.playSong.bind(this)}
        />
      );
    }
    const nowDate = new Date();
    let logOrPlay = loged
      ? { onClick: this.playAllHandler.bind(this) }
      : { onClick: this.goLogin.bind(this) };
    let logOrPlayText = loged ? "PLAY ALL" : "GO LOGIN";
    return (
      <div className="day_recommand">
        <div className="day_recommand_wrap">
          <div className="index_title">
            <h1 className="daily_tile">
              DAILY
              <Button ghost={true} size="small" {...logOrPlay}>
                <Icon type="plus" />
                {logOrPlayText}
              </Button>
            </h1>
            {loged ? (
              <span className="daily_info">
                歌单生成于{nowDate.getFullYear()}年{nowDate.getMonth()}月{nowDate.getDay()}日6:00
              </span>
            ) : (
              <span className="daily_info">登陆获取每日推荐歌单</span>
            )}
          </div>
          {loged && lis}
        </div>
      </div>
    );
  }
}
