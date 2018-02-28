import React from "react";
import { connect } from "react-redux";
import { ListFloat } from "../components/common";
import {
  unshift_song_list,
  push_song_list,
  copyAllSongs
} from "../redux/actions";
import { Button, Icon } from "antd";

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
    this.props.dispatch(copyAllSongs(this.state.list));
  }
  playSong(e) {
    e = e || window.event;
    var id = e.currentTarget.getAttribute("data-id");
    this.props.dispatch(unshift_song_list(id));
  }
  addSong(id) {
    this.props.dispatch(push_song_list(id));
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
    return (
      <div className="day_recommand">
        <div className="day_recommand_wrap">
          <div className="index_title">
            <h1 className="daily_tile">
              DAILY
              {loged && (
                <Button
                  ghost={true}
                  size="small"
                  onClick={this.playAllHandler.bind(this)}
                >
                  <Icon type="plus" />
                  PLAY ALL
                </Button>
              )}
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
