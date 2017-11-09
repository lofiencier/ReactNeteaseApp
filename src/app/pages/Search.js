import React from "react";
import List from "../components/list";
import AUDIO from "../components/AUDIO";
import { connect } from "react-redux";
import fetchList from "../actions/fetchList";
import fetchAudio from "../actions/fetchAudio";

@connect(store => {
  return {
    curShowList: store.curShowList,
    Audio: store.Audio
  };
})
export default class Search extends React.Component {
  constructor() {
    super();
    this.playHandler = this.playHandler.bind(this);
  }

  submitHandler(e) {
    e.preventDefault();
    let keywords = document.getElementById("song_name").value;
    this.props.dispatch(fetchList(keywords));
  }

  playHandler(e) {
    let song_id = e.currentTarget.getAttribute("data-id");
    this.props.dispatch(fetchAudio(song_id));
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submitHandler.bind(this)}>
          <label htmlFor="song_name" />
          <input type="text" id="song_name" />
          <input type="submit" />
        </form>
        <List
          songs={this.props.curShowList.targetList}
          playHandler={this.playHandler}
        />
        <AUDIO URL={this.props.Audio.targetURL} />
      </div>
    );
  }
}
