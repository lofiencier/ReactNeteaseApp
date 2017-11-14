import React from "react";
import List from "../components/list";
import { connect } from "react-redux";

@connect(store => {
  return {
    AudioDom: store.AudioDom
  };
})
export default class Playbox extends React.Component {
  render() {
    return <h1>playbox</h1>;
  }
}
