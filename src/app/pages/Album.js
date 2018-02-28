import React from "react";
import { connect } from "react-redux";
import {
  fetchArtistAlbum,
  fetchAlbum,
  fetchSingleSong,
  changeCurId,
  unshift_song_list,
  copyAllSongs,
  push_song_list
} from "../redux/actions";
import List from "../components/list";
import StackBlur from "stackblur-canvas";
import { Album, Album_info, Blur_bg, HotAlbums } from "../components/common";

@connect(store => {
  return {
    album: store.album,
    Playbox: store.Playbox,
    artist: store.artist
  };
})
export default class AlbumPage extends React.Component {
  constructor() {
    super();
    this.playHandler = this.playHandler.bind(this);
  }
  componentDidMount() {
    this.fetchHandler(this.props.location.search);
    this.blurHandler();
  }

  fetchHandler(al_id) {
    this.props.dispatch(fetchAlbum(al_id));
  }

  blurHandler() {
    document.getElementById("blurImg").onload = function() {
      StackBlur.image("blurImg", "album_blur_canvas", 10, false);
    };
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.location.search != nextProps.location.search) {
      this.fetchHandler(nextProps.location.search);
    }
  }
  playAllHandler() {
    this.props.dispatch(copyAllSongs(this.props.album.songs));
  }
  playHandler(id) {
    this.props.dispatch(unshift_song_list(id));
  }
  addHandler(id) {
    this.props.dispatch(push_song_list(id));
  }
  render() {
    let hotAlbumsView = <h1>Loading...</h1>;
    if (this.props.album.artistId) {
      hotAlbumsView = <HotAlbums artist_id={this.props.album.artistId} />;
    }
    return (
      <div className="root_content">
        <div className="album_content_wrap">
          <Album_info
            playAllHandler={this.playAllHandler.bind(this)}
            type="ALBUM"
            coverUrl={this.props.album.album.picUrl}
            name={this.props.album.album.name}
            time={this.props.album.album.publishTime}
            company={this.props.album.album.company}
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
                    {this.props.album.album.description
                      ? this.props.album.album.description
                          .split("")
                          .splice(0, 300)
                          .join("")
                      : "无简介"}
                  </small>
                </p>
              </div>
              <List
                songs={this.props.album.songs}
                playHandler={this.playHandler.bind(this)}
                addSong={this.addHandler.bind(this)}
              />
              <span className="album_h1">
                ANY OTHER ALBUMS<a
                  href="javascript:void(0)"
                  className="description_more"
                >
                  MORE
                </a>
              </span>
              {hotAlbumsView}
            </div>
          </div>
        </div>
        <Blur_bg />
      </div>
    );
  }
}
