import React from "react";
import { connect } from "react-redux";
import Header from "../components/Header";
import Banner from "../components/Banner";

@connect(store => {
  return {
    album: store.album,
    Audio: store.Audio
  };
})
export default class IndexPage extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Banner />
      </div>
    );
  }
}
