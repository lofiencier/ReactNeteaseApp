import React from "react";
import { connect } from "react-redux";

@connect(store => {
  return {
    Playbox: store.Playbox
  };
})
export default class FM extends React.Component {
  render() {
    return null;
  }
}
