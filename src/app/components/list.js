import React from "react";

export default class Form extends React.Component {
  constructor() {
    super();
  }
  componentDidUpdate() {
    console.log("this.songs:", this.props.songs);
  }

  render() {
    let lists = this.props.songs.map(song => (
      <tr key={song.id}>
        <td>
          <a
            href="javascript:void(0)"
            data-id={song.id}
            onClick={this.props.playHandler}
          >
            <small>PLAY</small>
          </a>
        </td>
        <td>{song.name}</td>
        <td>{song.artists[0].name}</td>
        <td>
          <a href="#" data-id={song.album.id}>
            <small>{song.album.name}</small>
          </a>
        </td>
      </tr>
    ));
    return (
      <table>
        <tbody>
          <tr>
            <th style={{ textAlign: "left" }}>PLAY</th>
            <th style={{ textAlign: "left" }}>NAME</th>
            <th style={{ textAlign: "left" }}>ARITIST</th>
            <th style={{ textAlign: "left" }}>ALBUM</th>
          </tr>
          {lists}
        </tbody>
      </table>
    );
  }
}
