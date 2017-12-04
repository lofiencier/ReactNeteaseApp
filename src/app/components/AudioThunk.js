import React from "react";
import { connect } from "react-redux";
import { fetchSingleSong, changeIndex } from "../redux/actions";
import logger from "redux-logger";

@connect(store => {
  return {
    Playbox: store.Playbox
  };
})
export default class AudioThunk extends React.Component {
  constructor() {
    super();
    this.endedHandler = this.endedHandler.bind(this);
  }
  componentDidMount() {
    this.props.Playbox.AudioDom.addEventListener(
      "canplay",
      function() {
        console.log("canplay");
        this.volume = 0.2;
        this.play();
      },
      false
    );
    this.props.Playbox.AudioDom.addEventListener(
      "timeupdate",
      this.props.timeUpdateHandler,
      false
    );
    this.props.Playbox.AudioDom.addEventListener(
      "ended",
      this.endedHandler,
      false
    );
  }

  endedHandler() {
    this.props.dispatch(changeIndex(parseInt(this.props.Playbox.curIndex) + 1));
  }
  componentDidUpdate() {}
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.Playbox.isPlaying &&
      nextProps.Playbox.curIndex != this.props.Playbox.curIndex
    ) {
      let id = "";
      try {
        id = nextProps.Playbox.curList[nextProps.Playbox.curIndex].id;
      } catch (e) {
        console.log(nextProps.Playbox.curIndex);
      }
      //这里去dispatch获取此index对应的id，fetch对应的url
      console.log("why do you run twice?");
      nextProps.dispatch(fetchSingleSong(id));
    }
  }

  componentWillUnmount() {
    console.log("UNMOUNT");
    this.props.Playbox.AudioDom.removeEventListener(
      "timeUpdate",
      this.props.timeUpdateHandler,
      false
    );
  }
  render() {
    return null;
  }
}
