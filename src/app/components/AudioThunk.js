import React from "react";
import { connect } from "react-redux";
import {
  fetchSingleSong,
  changeIndex,
  fetchFm,
  import_buffer,
  togglePlayState
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
    console.warn("无论如何你都进这里？？");
    if (index < 0) {
      this.props.dispatch(changeIndex(list.length - 1));
    } else if (!list.length) {
      this.props.dispatch(togglePlayState());
    } else if (index > list.length - 1) {
      this.props.dispatch(changeIndex(0));
    } else {
      this.props.dispatch(fetchSingleSong(list[index].id));
    }
  }
  FMSwitchWatcher(index, fmList) {
    console.warn("FM SWITCH WATCHER");
    if (!fmList.length) {
      this.props.dispatch(fetchFm());
      this.props.dispatch(changeIndex(0));
      console.warn("FM LIST EMPTY?", fmList.length);
    } else {
      this.props.dispatch(changeIndex(0));
      this.props.dispatch(fetchSingleSong(fmList[0].id));
    }
  }
  componentDidMount() {
    var _this = this;
    this.props.Playbox.AudioDom.addEventListener(
      "canplay",
      function() {
        console.log("canplay");
        this.volume = _this.props.Playbox.volume;
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
    let nowPlaybox = this.props.Playbox;
    if (curIndex != nowPlaybox.curIndex && isFm && isPlaying) {
      this.FMIndexWatcher(curIndex, fmList, fm_preload);
    } else if (isFm && isFm != nowPlaybox.isFm) {
      //这里fm.music切换的场景(fm和music的index一致时)
      this.FMSwitchWatcher(curIndex, fmList, fm_preload);
    } else if (
      isFm &&
      fmList.length != nowPlaybox.fmList.length &&
      fmList.length
    ) {
      this.props.dispatch(fetchSingleSong(fmList[0].id));
    }

    if (curList.length != nowPlaybox.curList.length) {
      if (curList.length < nowPlaybox.curList.length) {
        if (curList.length > 0) {
          nextProps.dispatch(
            fetchSingleSong(nextProps.Playbox.curList[curIndex].id)
          );
        }
      } else {
        nextProps.dispatch(fetchSingleSong(nextProps.Playbox.curList[0].id));
      }
    } else if (curIndex != nowPlaybox.curIndex && !isFm && isPlaying) {
      this.MusicIndexWatcher(curIndex, curList);
    } else if (!isFm && isFm != nowPlaybox.isFm) {
      this.MusicIndexWatcher(curIndex, curList);
    } else if (
      curList.length > 0 &&
      curIndex == nowPlaybox.curIndex &&
      isPlaying &&
      !isFm &&
      curList[curIndex].id != nowPlaybox.curList[curIndex].id
    ) {
      nextProps.dispatch(fetchSingleSong(curList[curIndex].id));
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
