import React from "react";
import { connect } from "react-redux";
import { fetchAlbum, fetchAudio } from "../redux/actions";
import List from "../components/list";
import StackBlur from "stackblur-canvas";
import Header from "../components/Header";
import { Album_info, Blur_bg } from "../components/common";

@connect(store => {
  return {
    album: store.album,
    Audio: store.Audio
  };
})
export default class Search extends React.Component {
  constructor() {
    super();
    this.playHandler = this.playHandler.bind(this);
  }
  componentDidMount() {
    console.log(this.props.location.search);
    let al_id = this.props.location.search;
    this.props.dispatch(fetchAlbum(al_id));
    this.blurHandler();
  }

  blurHandler() {
    if (this.props.album.fetched) {
      document.getElementById("blurImg").onload = function() {
        StackBlur.image("blurImg", "album_blur_canvas", 10, false);
      };
    }
  }
  componentDidUpdate() {
    this.blurHandler();
  }

  playHandler(e) {
    let song_id = e.currentTarget.getAttribute("data-id");
    this.props.dispatch(fetchAudio(song_id));
  }
  render() {
    return (
      <div>
        <Header />
        <div className="album_content_wrap">
          <Album_info
            coverUrl={this.props.album.album.picUrl}
            name={this.props.album.album.name}
            time={this.props.album.album.publishTime}
            company={this.props.album.album.company}
          />
          <div className="album_list_bg">
            <div className="album_list_wrap">
              <div className="album_description">
                <span>DESCRIPTION</span>
                <p>
                  <small>
                    {this.props.album.album.description
                      ? this.props.album.album.description
                          .split("")
                          .splice(0, 300)
                          .join("")
                      : "无简介"}
                  </small>
                </p>
              </div>
              <div className="album_actions">
                <div className="play_chosen">
                  <a href="javascript:void(0)">PLAY</a>
                </div>
                <div className="download_chosen">
                  <a href="javascript:void(0)">LIKE</a>
                </div>
                <div className="collect_chosen">
                  <a href="javascript:void(0)">DOWN</a>
                </div>
              </div>
              <div className="song_list">
                <List
                  songs={this.props.album.songs}
                  playHandler={this.playHandler}
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
