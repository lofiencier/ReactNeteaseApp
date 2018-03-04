import React from "react";
import { connect } from "react-redux";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import Banner from "../components/Banner";
import Day from "../components/Day";
import { Recommand, TopAlbum, Billboard, Boutique } from "../components/common";
import Playbox from "../components/Playbox";
import { unshiftSong, coverList } from "../redux/actions";

@connect(store => {
  return {
    user: store.user,
    album: store.album,
    Audio: store.Audio
  };
})
export default class IndexPage extends React.Component {
  playHandler(song) {
    this.props.dispatch(unshiftSong(song));
  }
  playAllHandler(songs) {
    this.props.dispatch(coverList(songs));
  }
  render() {
    return (
      <div className="root_content">
        <Banner />
        <Recommand />
        <Day />
        <TopAlbum offset={1} />
        <Boutique />
        <Billboard
          playSong={this.playHandler.bind(this)}
          playAll={this.playAllHandler.bind(this)}
        />
      </div>
    );
  }
}
