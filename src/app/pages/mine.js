import React from "react";
import { connect } from "react-redux";
import {
  getCollect,
  fetchPlaylist,
  unshiftSong,
  pushSong,
  coverList
} from "../redux/actions";
import List from "../components/list";
import StackBlur from "stackblur-canvas";
import { Blur_bg, UserInfo } from "../components/common";
import { Icon } from "antd";

@connect(store => {
  return {
    user: store.user
  };
})
export default class AlbumPage extends React.Component {
  constructor() {
    super();
    // this.playHandler = this.playHandler.bind(this);
    this.state = {
      index: 0
    };
  }

  componentWillMount() {
    // console.log();
    let uid = JSON.parse(localStorage.profile).userId;
    this.props.dispatch(getCollect(uid));
    this.props.dispatch(
      fetchPlaylist("?id=" + this.props.location.search.split("=")[1], true)
    );
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.location.search.length) {
      nextProps.history.replace(
        "/mine?playlist=" + nextProps.user.collections[0].playlistId
      );
    } else if (nextProps.location.search != this.props.location.search) {
      nextProps.dispatch(
        fetchPlaylist("?id=" + nextProps.location.search.split("=")[1], true)
      );
    }
  }
  componentDidMount() {
    this.blurHandler();
  }

  blurHandler() {
    document.getElementById("blurImg").onload = function() {
      StackBlur.image("blurImg", "album_blur_canvas", 10, false);
    };
  }
  playHandler(id) {
    this.props.dispatch(unshiftSong(id));
  }
  addHandler(id) {
    this.props.dispatch(pushSong(id));
  }
  getIndex(index) {
    // console.log(index)
    this.setState({
      index: index
    });
  }
  playAllHandler() {
    const { curPlaylist } = this.props.user;
    this.props.dispatch(coverList(curPlaylist));
  }
  render() {
    let collections = this.props.user.collections;
    return (
      <div className="mine_root_content">
        <div className="playlist_content_wrap">
          <UserInfo
            cols={collections}
            profile={JSON.parse(localStorage.profile)}
            getIndex={this.getIndex.bind(this)}
            curIndex={this.state.index}
            playall={this.playAllHandler.bind(this)}
          />
          <div className="playlist_content_wrap">
            <div className="album_list_bg">
              <div className="album_list_wrap">
                <span className="album_h1">
                  DESCRIPTION<a
                    href="javascript:void(0)"
                    className="description_more"
                  >
                    MORE
                  </a>
                </span>
                <div className="album_description">
                  <p>
                    <small>
                      {this.props.user.curPlaylist.description
                        ? this.props.curPlaylist.description
                            .split("")
                            .splice(0, 300)
                            .join("")
                        : "无简介"}
                    </small>
                  </p>
                </div>

                <List
                  songs={
                    this.props.user.curPlaylist
                      ? this.props.user.curPlaylist
                      : []
                  }
                  playHandler={this.playHandler.bind(this)}
                  addSong={this.addHandler.bind(this)}
                />
              </div>
            </div>
          </div>
        </div>
        <Blur_bg />
      </div>
    );
  }
}
