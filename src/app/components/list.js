import React from "react";

export default class Form extends React.Component {
  constructor() {
    super();
  }
  componentDidUpdate() {
    console.log(this.props.songs);
  }
  render() {
    let lists = this.props.songs.map(song => (
      <li data-id={song.id} key={song.id}>
        <a href="#">
          <span style={{ float: "left" }}>{song.name}</span>
          <span style={{ float: "right" }}>{song.artists[0].name}</span>
        </a>
      </li>
    ));
    return <ul style={{ width: "400px" }}>{lists}</ul>;
  }
}
