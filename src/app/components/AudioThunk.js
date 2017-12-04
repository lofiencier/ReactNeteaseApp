import React from "react";
import { connect } from "react-redux";
import { fetchSingleSong } from "../redux/actions";

@connect(store => {
  return {
    Playbox: store.Playbox
  };
})
export default class AudioThunk extends React.Component {
  componentDidMount() {
    this.props.Playbox.AudioDom.addEventListener(
      "canplay",
      function() {
        console.log("canplay");
        this.play();
      },
      false
    );
    this.props.Playbox.AudioDom.addEventListener(
      "timeUpdate",
      this.props.timeUpdateHandler,
      false
    );
  }
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.Playbox.isPlaying &&
      nextProps.Playbox.curIndex != this.props.Playbox.curIndex
    ) {
      // console.log(this.props.Playbox.curIndex,nextProps.Playbox.curIndex);
      console.log(
        "YOU ARE PLAYING:",
        nextProps.Playbox.curList[nextProps.Playbox.curIndex].name
      );
      let id = nextProps.Playbox.curList[nextProps.Playbox.curIndex].id;
      //这里去dispatch获取此index对应的id，fetch对应的url
      nextProps.dispatch(fetchSingleSong(id));
    }
    if (nextProps.Playbox.isPlaying && nextProps.Playbox.curMusicUrl) {
      nextProps.Playbox.AudioDom.src = nextProps.Playbox.curMusicUrl;
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
