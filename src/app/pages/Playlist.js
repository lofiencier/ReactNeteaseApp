import React from "react";
import { connect } from "react-redux";
import {
  fetchPlaylist,
  copySongInfo,
  copyAllSongs,
  fetchSingleSong,
  changeIndex,
  unshift_song_list,
  push_song_list
} from "../redux/actions";
import List from "../components/list";
import StackBlur from "stackblur-canvas";
import Header from "../components/Header";
import { Album, Album_info, Blur_bg, HotAlbums } from "../components/common";

var fetchConfig = { withCredentials: true };

@connect(store => {
  return {
    playlist: store.playlist,
    Playbox: store.Playbox
  };
})
export default class Playlist extends React.Component {
  constructor() {
    super();
    this.playHandler = this.playHandler.bind(this);
  }
  blurHandler() {
    document.getElementById("blurImg").onload = function() {
      StackBlur.image("blurImg", "album_blur_canvas", 10, false);
    };
  }
  playAllHandler() {
    this.props.dispatch(copyAllSongs(this.props.playlist.songs));
  }
  componentDidMount() {
    // console.log("axios:",axios);
    axios
      .get("/personal_fm", { withCredentials: true })
      .then(({ data }) => console.log(data));
    this.blurHandler();
    let listId = this.props.location.search;
    if (listId !== "") {
      this.props.dispatch(fetchPlaylist(listId));
    }
    axios.get(`/simi/playlist${listId}`, fetchConfig).then(({ data }) => {});
  }
  playHandler(id) {
    this.props.dispatch(unshift_song_list(id));
  }
  addHandler(id) {
    this.props.dispatch(push_song_list(id));
  }
  render() {
    return (
      <div className="root_content">
        <div className="playlist_content_wrap">
          <Album_info
            playAllHandler={this.playAllHandler.bind(this)}
            type="COLLECT"
            coverUrl={this.props.playlist.coverImgUrl}
            name={this.props.playlist.name}
            playCount={
              this.props.playlist.playCount > 10000
                ? parseInt(this.props.playlist.playCount / 10000) + "W"
                : this.props.playlist.playCount
            }
            creator={this.props.playlist.creator.nickname}
          />
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
                    {this.props.playlist.description
                      ? this.props.playlist.description
                          .split("")
                          .splice(0, 300)
                          .join("")
                      : "无简介"}
                  </small>
                </p>
              </div>
              <List
                songs={this.props.playlist.songs}
                playHandler={this.playHandler.bind(this)}
                addSong={this.addHandler.bind(this)}
              />
              <span className="album_h1">
                SIMILAR COLLECTIONS<a
                  href="javascript:void(0)"
                  className="description_more"
                >
                  MORE
                </a>
              </span>
            </div>
          </div>
        </div>
        <Blur_bg />
      </div>
    );
  }
}
