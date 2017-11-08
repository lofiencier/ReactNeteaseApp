import React from "react";
import List from "./list";

export default class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      cur_song_list: []
    };
  }

  submitHandler(e) {
    e.preventDefault();
    let keywords = document.getElementById("song_name").value;
    this.fetchHandler(keywords, this);
  }

  fetchHandler(keywords, that) {
    fetch(`http://localhost:3000/api/search?keywords=${keywords}`, {
      method: "GET",
      mode: "cors"
    })
      .then(function(res) {
        console.log("Fetching...");
        return res.json();
      })
      .then(function(data) {
        console.log("data from Form", data);
        that.setState({
          cur_song_list: data.result.songs
        });
      });
  }

  setSongs(data) {}
  render() {
    return (
      <div>
        <form onSubmit={this.submitHandler.bind(this)}>
          <label htmlFor="song_name" />
          <input type="text" id="song_name" />
          <input type="submit" />
        </form>
        <List songs={this.state.cur_song_list} />
      </div>
    );
  }
}
