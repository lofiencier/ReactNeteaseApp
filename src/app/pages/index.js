import React from "react";
import { connect } from "react-redux";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Day from "../components/Day";
import { Recommand, TopAlbum, Billboard, Boutique } from "../components/common";
import { copyAllSongs, unshift_song_list } from "../redux/actions";
import Playbox from "../components/Playbox";

@connect(store => {
  return {
    user: store.user,
    album: store.album,
    Audio: store.Audio
  };
})
export default class IndexPage extends React.Component {
  playHandler(id) {
    this.props.dispatch(unshift_song_list(id));
  }
  playAllHandler(songs) {
    // console.log("1")
    // console.log(this,songs);
    this.props.dispatch(copyAllSongs(songs));
  }
  render() {
    return (
      <div className="root_content">
        <Banner />
        <Recommand />
        <Day loged={this.props.user.loged} />
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
