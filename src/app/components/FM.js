import React from "react";
import { connect } from "react-redux";
import { fetchFm } from "../redux/actions";

@connect(store => {
  return {
    Playbox: store.Playbox
  };
})
export default class FM extends React.Component {
  componentDidMount() {
    console.log("FM MODULE MOUNT");
  }
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.Playbox.isFm &&
      this.props.Playbox.isFm != nextProps.Playbox.isFm
    ) {
      console.log("this is where your fm start dispatch");
      this.props.dispatch(fetchFm());
    }
  }
  render() {
    return <div className="fm_root_content" />;
  }
}
