import React from "react";
import { connect } from "react-redux";
import { fetchPlaylist, fetchAudio } from "../redux/actions";
import List from "../components/list";
import StackBlur from "stackblur-canvas";
import Header from "../components/Header";
import { Album, Album_info, Blur_bg, HotAlbums } from "../components/common";

@connect(store => {
  return {
    playlist: store.playlist,
    Audio: store.Audio
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
      .then(data => {
        console.log("data", data);
      });
  }
  playHandler(e) {
    let song_id = e.currentTarget.getAttribute("data-id");
    this.props.dispatch(fetchAudio(song_id));
  }
  render() {
    return (
      <div>
        <Header />
        <div className="playlist_content_wrap">
          <Album_info
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
