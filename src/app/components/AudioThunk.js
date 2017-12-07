import React from "react";
import { connect } from "react-redux";
import {
  fetchSingleSong,
  changeIndex,
  fetchFm,
  import_buffer
} from "../redux/actions";
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
  FMIndexWatcher(index, fmList, fm_preload) {
    console.warn("FM_INDEX_WATCHER:", index);
    if (index < fmList.length - 1) {
      this.props.dispatch(fetchSingleSong(fmList[index].id));
    } else if (index == fmList.length - 1) {
      console.warn("You should fetch");
      this.props.dispatch(fetchSingleSong(fmList[index].id));
      this.props.dispatch(fetchFm(true));
    } else if (fmList.length) {
      console.warn("OVERID!!");
      if (fm_preload.length) {
        this.props.dispatch(import_buffer());
        this.props.dispatch(changeIndex(0));
      }
    }
  }
  MusicIndexWatcher(index, list) {
    if (index < 0) {
      this.props.dispatch(changeIndex(list.length - 1));
    } else if (index > list.length - 1) {
      this.props.dispatch(changeIndex(0));
    } else {
      this.props.dispatch(fetchSingleSong(list[index].id));
    }
  }
  FMSwitchWatcher(fmList) {
    console.warn("FM SWITCH WATCHER");
    if (!fmList.length) {
      // this.props.dispatch(fetchFm());
      this.props.dispatch(changeIndex(0));
      console.warn("FM LIST EMPTY");
    } else {
      this.props.dispatch(fetchSingleSong(fmList[0].id));
    }
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
    let {
      curIndex,
      isFm,
      curList,
      fmList,
      fm_preload,
      isPlaying
    } = nextProps.Playbox;
    if (curIndex != this.props.Playbox.curIndex && isFm && isPlaying) {
      this.FMIndexWatcher(curIndex, fmList, fm_preload);
    } else if (isFm && isFm != this.props.Playbox.isFm) {
      //这里fm.music切换的场景(fm和music的index一致时)
      this.FMSwitchWatcher(curIndex, fmList, fm_preload);
    } else if (
      isFm &&
      fmList.length != this.props.Playbox.fmList.length &&
      fmList.length
    ) {
      this.props.dispatch(fetchSingleSong(fmList[0].id));
    }

    if (curIndex != this.props.Playbox.curIndex && !isFm && isPlaying) {
      this.MusicIndexWatcher(curIndex, curList);
    } else if (!isFm && isFm != this.props.Playbox.isFm) {
      this.MusicIndexWatcher(curIndex, curList);
    }
    //switch到fm时一定播放，switch到music时music list无歌曲不播放
    //专辑和歌单的播放按钮会导致switch，并改变index
    //不让fm的list过界
    //当播放fm时，index+1（即点击next或者ended the song的时候，fetch下一个fmlist，放入缓冲池）
    //再次点击next或者ended的时候，缓冲池放入list，index为0,会不会有点延迟呢？
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
