import React from "react";
import { connect } from "react-redux";
import {
  fetchPlaylist,
  copySongInfo,
  copyAllSongs,
  fetchSingleSong
} from "../redux/actions";
import List from "../components/list";
import StackBlur from "stackblur-canvas";
import Header from "../components/Header";
import { Album, Album_info, Blur_bg, HotAlbums } from "../components/common";

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
    this.blurHandler();
    let listId = this.props.location.search;
    if (listId !== "") {
      this.props.dispatch(fetchPlaylist(listId));
    }
    fetch(`http://localhost:3000/simi/playlist${listId}`, {
      method: "GET",
      mode: "cors"
    })
      .then(res => res.json())
      .then(data => {});
  }
  playHandler(e) {
    let song_id = e.currentTarget.getAttribute("data-id");
    let song_i = e.currentTarget.getAttribute("data-i");
    this.props.dispatch(
      copySongInfo(this.props.playlist.songs[song_i], song_i)
    );
    this.props.dispatch(fetchSingleSong(song_id));
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
                playHandler={this.playHandler}
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
