import React from "react";
import { connect } from "react-redux";
import Header from "../components/Header";
import Banner from "../components/Banner";
import {
  Recommand,
  Day,
  TopAlbum,
  Billboard,
  Boutique
} from "../components/common";
import Playbox from "../components/Playbox";

@connect(store => {
  return {
    user: store.user,
    album: store.album,
    Audio: store.Audio
  };
})
export default class IndexPage extends React.Component {
  render() {
    return (
      <div className="root_content">
        <Banner />
        <Recommand />
        <Day loged={this.props.user.loged} />
        <TopAlbum offset={1} />
        <Boutique />
        <Billboard />
      </div>
    );
  }
}
