import React from "react";
import { connect } from "react-redux";
import { fetchPlaylist, fetchAudio } from "../redux/actions";
import List from "../components/list";

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
  componentDidMount() {
    let listId = this.props.location.search;
    if (listId !== "") {
      this.props.dispatch(fetchPlaylist(listId));
    }
  }
  playHandler(e) {
    let song_id = e.currentTarget.getAttribute("data-id");
    this.props.dispatch(fetchAudio(song_id));
  }
  render() {
    if (this.props.location.search === "") {
      return <h1>404</h1>;
    } else {
      if (this.props.playlist.fetched) {
        return (
          <List
            songs={this.props.playlist.songs}
            playHandler={this.playHandler}
          />
        );
      } else {
        return this.props.playlist.view;
      }
    }
  }
}

const songlist = props => {};
