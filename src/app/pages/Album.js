import React from "react";
import { connect } from "react-redux";
import { fetchAlbum, fetchAudio } from "../redux/actions";
import List from "../components/list";
import StackBlur from "stackblur-canvas";
import Header from "../components/Header";
import { Album_info } from "../components/common";

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
  }

  componentDidUpdate() {
    if (this.props.album.fetched) {
      document.getElementById("blurImg").onload = function() {
        StackBlur.image("blurImg", "album_blur_canvas", 10, false);
      };
    }
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
          <Album_info coverUrl={this.props.album.album.picUrl} />
          <div className="album_list_firmi">
            <List
              songs={this.props.album.songs}
              playHandler={this.playHandler}
            />
          </div>
        </div>
        <div className="bg_content">
          <div className="album_page_bg">
            <img src="../static/images/banner.jpg" alt="" id="blurImg" />
          </div>
          <div className="canvasHolder">
            <canvas id="album_blur_canvas" />
          </div>
        </div>
      </div>
    );
  }
}
