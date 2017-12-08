import React from "react";
import { connect } from "react-redux";

@connect(store => {
  return {
    user: store.user
  };
})
export default class loginbox extends React.Component {
  render() {
    return null;
  }
}
