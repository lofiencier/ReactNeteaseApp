import React from "react";
import { connect } from "react-redux";

export default class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      defaultView: <h1>default</h1>
    };
  }
  componentDidMount() {
    if (this.props.location.search === "") {
      this.setState({ defaultView: <h1>404</h1> });
    } else {
      let listId = this.props.location.search;
      fetch(`http://localhost:3000/playlist/detail${listId}`, {
        method: "GET",
        mode: "cors"
      })
        .then(function(res) {
          return res.json();
        })
        .then(function(data) {
          console.log(data);
        });
    }
  }
  render() {
    return this.state.defaultView;
  }
}

const songlist = props => {};

// .playlist.name
// .playlist.coverImgId
// .playlist.tracks["0"].id
// .playlist.tracks["0"].name
// .playlist.tracks["0"].mv
// .playlist.tracks["0"].al.name
// .playlist.tracks["0"].al.picUrl
