import React from "react";
import { connect } from "react-redux";

@connect(store => {
  return {
    album: store.album,
    Audio: store.Audio
  };
})
export default class IndexPage extends React.Component {
  render() {
    return <h1 />;
  }
}
