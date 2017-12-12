import React from "react";
import { connect } from "react-redux";
import { getCollect, fetchPlaylist } from "../redux/actions";
import List from "../components/list";
import StackBlur from "stackblur-canvas";
import { Blur_bg, UserInfo } from "../components/common";

@connect(store => {
  return {
    user: store.user
  };
})
export default class AlbumPage extends React.Component {
  constructor() {
    super();
    // this.playHandler = this.playHandler.bind(this);
  }
  componentWillMount() {
    // console.log();
    let uid = JSON.parse(localStorage.profile).userId;
    this.props.dispatch(getCollect(uid));
    // console.log("WILL MOUNT")
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.location.search.length) {
      nextProps.history.replace(
        "/mine?playlist=" + nextProps.user.collections[0].playlistId
      );
    } else if (nextProps.location.search != this.props.location.search) {
      // console.log(nextProps.location.search)
      // console.log()
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

  render() {
    let collections = this.props.user.collections;
    return (
      <div className="root_content">
        <div className="mine_content_wrap">
          <UserInfo
            cols={collections}
            profile={JSON.parse(localStorage.profile)}
          />
        </div>
        <div className="playlist_content_wrap">
          <div className="album_list_bg" />
        </div>
        <Blur_bg />
      </div>
    );
  }
}
