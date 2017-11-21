import React from "react";
import { connect } from "react-redux";
import { fetchAlbum, fetchAudio } from "../redux/actions";
import List from "../components/list";

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
  playHandler(e) {
    let song_id = e.currentTarget.getAttribute("data-id");
    this.props.dispatch(fetchAudio(song_id));
  }
  render() {
    if (this.props.album.fetched) {
      return (
        <div className="album_page">
          <div className="album_bg_mask" />
          <div className="album_page_bg" />
          <List songs={this.props.album.songs} playHandler={this.playHandler} />
        </div>
      );
    } else {
      return this.props.album.view;
    }
  }
}
