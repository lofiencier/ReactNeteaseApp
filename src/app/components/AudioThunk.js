import React from "react";
import { connect } from "react-redux";
import { fetchSingleSong, changeIndex, fetchFm } from "../redux/actions";
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
  indexWatcher(nextProps) {}
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
    let playbox = nextProps.Playbox;
    let id = "";
    this.indexWatcher(nextProps);
    if (playbox.isPlaying && playbox.curIndex != this.props.Playbox.curIndex) {
      //切歌时的dispatch，此时index改变
      if (playbox.isFm) {
        id = playbox.fmList[playbox.curIndex].id;
      } else {
        id = playbox.curList[playbox.curIndex].id;
      }
      //这里去dispatch获取此index对应的id，fetch对应的url
      console.log("Thunk gets id:", id);
      nextProps.dispatch(fetchSingleSong(id));
    } else if (playbox.isPlaying && playbox.isFm != this.props.Playbox.isFm) {
      //切换fm和music模式的dispatch，
      if (playbox.isFm && playbox.fmList.length) {
        id = playbox.fmList[playbox.curIndex].id;
      } else if (playbox.curList.length) {
        id = playbox.curList[playbox.curIndex].id;
      }
      console.log("Thunk2 gets id:", id);
      nextProps.dispatch(fetchSingleSong(id));
    }

    //fm 音乐列表过界
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
