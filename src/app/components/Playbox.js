import React from "react";
import { connect } from "react-redux";
import {
  toggleList,
  changeCurIndex,
  changePlayPosition,
  changeMusicIndex,
  delSong,
  togglePlayStatus,
  toggleMode,
  changeFmIndex,
  changeVolume,
  toggleShowPlaybox,
  songEnded
} from "../redux/actions";
import { Changer, PlayboxList, InfoBox } from "../components/common";
import Lyric from "./Lyric";
import { Icon, Switch, Button, Menu, Dropdown, Slider } from "antd";
import { getDefault, getTrans } from "./transform";

@connect(store => {
  return {
    Playbox: store.Playbox
  };
})
export default class Playbox extends React.Component {
  constructor() {
    super();
    this.state = {
      time: "00:00",
      currentTime: 0,
      percent: 0,
      slideMode: false,
      localUrl: "",
      baseOffsetWidth: (document.documentElement.offsetWidth - 1200) / 2 + 30,
      baseOffsetHeight: document.documentElement.offsetHeight / 2
    };
    this.switchModeHandler = this.switchModeHandler.bind(this);
    this.changeMusicIndexHandler = this.changeMusicIndexHandler.bind(this);
    window.addEventListener("resize", this.changeOffset.bind(this));
  }
  changeOffset() {
    let { offsetWidth, offsetHeight } = document.documentElement;
    this.setState({
      baseOffsetWidth: (offsetWidth - 1200) / 2 + 30,
      baseOffsetHeight: offsetHeight / 2
    });
  }
  componentDidMount() {
    const { AudioDom } = this.props.Playbox;
    AudioDom.volume = this.props.Playbox.volume;
    AudioDom.addEventListener("ended", this.songEndHandler.bind(this));
    AudioDom.addEventListener("timeupdate", this.timeUpdateHandler.bind(this));
    this.refs.process.rcSlider.sliderRef.addEventListener(
      "mousedown",
      this.startSlide.bind(this),
      false
    );
    document.addEventListener("mouseup", this.stopSlide.bind(this), false);
  }
  componentWillUnmount() {
    const { AudioDom } = this.props.Playbox;
    AudioDom.removeEventListener("ended", this.songEndHandler.bind(this));
    AudioDom.removeEventListener(
      "timeupdate",
      this.timeUpdateHandler.bind(this)
    );
    this.refs.process.rcSlider.sliderRef.removeEventListener(
      "mousedown",
      this.startSlide,
      false
    );
    document.removeEventListener(
      "mouseup",
      "process_bar",
      this.stopSlide,
      false
    );
  }
  songEndHandler() {
    this.props.dispatch(songEnded());
  }
  switchModeHandler() {
    // this.props.dispatch(switchMode(this.props.Playbox.isFm));
    this.props.dispatch(toggleMode());
  }
  toggleListHandler() {
    this.props.dispatch(toggleList(this.props.Playbox.showList));
  }
  changeMusicIndexHandler(index) {
    this.props.dispatch(changeMusicIndex(index));
  }
  changeFmIndexHandler() {
    this.props.dispatch(changeFmIndex(index));
  }
  timeUpdateHandler(e) {
    e = e || window.event;
    // console.log(e.path[0].currentTime);
    let dur = e.path[0].duration;
    let curTime = e.path[0].currentTime;
    let play_percent = parseInt(curTime / dur * 10000) / 100 || 0;
    // this.refs.process.
    this.setState({
      percent: play_percent,
      currentTime: e.path[0].currentTime
    });

    if (e.currentTarget.readyState == 4) {
      let buffer_percent =
        Math.round(
          e.currentTarget.buffered.end(0) / e.currentTarget.duration * 100
        ) + "%";
      if (buffer_percent != 100) {
        //you need debounce here
        if (this.refs.process) {
          this.refs.process.rcSlider.sliderRef.querySelector(
            ".ant-slider-step"
          ).style.width = buffer_percent;
        }
        // console.log(this.refs.process.rcSlider.sliderRef.querySelector(".ant-slider-rail"));
      }
    }
  }
  prevSong() {
    let { curIndex } = this.props.Playbox;
    this.props.dispatch(changeMusicIndex(curIndex - 1));
  }
  nextSong() {
    let { curIndex, isFm } = this.props.Playbox;
    isFm
      ? this.props.dispatch(changeFmIndex(curIndex + 1))
      : this.props.dispatch(changeMusicIndex(curIndex + 1));
  }
  emptyListHandler() {
    // this.props.dispatch(emptyList());
  }
  playHandler() {
    // this.props.dispatch(togglePlayState());
    this.props.dispatch(togglePlayStatus());
  }
  changeVol(vol) {
    // console.log(vol);
    this.props.dispatch(changeVolume(vol / 100));
  }
  tipformate(val) {
    var dur = this.props.Playbox.AudioDom.duration;
    // var min=((val/100)*dur/1000/60).toString();
    if (val && dur) {
      var min = (val / 100 * dur / 60 / 100)
        .toString()
        .split(".")[1]
        .slice(0, 2);
      var sec = (((val / 100 * dur) % 60) / 100)
        .toString()
        .split(".")[1]
        .slice(0, 2);
      var durMin = (dur / 60 / 100)
        .toString()
        .split(".")[1]
        .slice(0, 2);
      var durSec = ((dur / 60) % 100)
        .toString()
        .split(".")[1]
        .slice(0, 2);
    } else {
      return "00:00 / 00:00";
    }
    return `${min}:${sec} / ${durMin}:${durSec}`;
  }
  startSlide() {
    this.setState({
      slideMode: true
    });
  }
  stopSlide() {
    this.setState({
      slideMode: false
    });
  }
  delHandler(index) {
    console.log(index);
    this.props.dispatch(delSong(index));
  }
  currentPositon(val) {
    console.log("当前位置为:", val);
    var curTime = val / 100 * this.props.Playbox.AudioDom.duration;
    this.setState({
      percent: val
    });
    this.props.dispatch(changePlayPosition(curTime));
  }
  downloadHandler() {
    this.refs.download.click();
  }
  transformer() {
    let { isFm, curList } = this.props.Playbox;
    if (isFm || (!isFm && curList.length > 0)) {
      this.props.dispatch(toggleShowPlaybox());
    }
  }
  shutBox() {
    this.props.dispatch(toggleShowPlaybox());
  }
  render() {
    const {
      curList,
      curIndex,
      isPlaying,
      isFm,
      AudioDom,
      curMusicUrl,
      showPlaybox
    } = this.props.Playbox;
    const style = {
      height: "90%",
      margin: "2px 10px",
      padding: "2px 4px"
    };
    const transformStyle = showPlaybox
      ? getTrans(this.state.baseOffsetWidth, this.state.baseOffsetHeight)
      : getDefault();
    const download = isPlaying ? { download: curList[curIndex] } : {};
    const menu = (
      <Menu>
        <Menu.Item
          style={{ height: "100px", overflow: "hidden", padding: "8px" }}
        >
          <Slider
            vertical={true}
            style={style}
            onChange={this.changeVol.bind(this)}
            defaultValue={this.props.Playbox.volume * 100}
          />
        </Menu.Item>
      </Menu>
    );
    var proSlider;
    this.state.slideMode
      ? (proSlider = (
          <Slider
            ref="process"
            className="process_bar"
            min={1}
            onAfterChange={
              AudioDom.duration ? this.currentPositon.bind(this) : () => false
            }
            tipFormatter={this.tipformate.bind(this)}
            style={transformStyle.process}
          />
        ))
      : (proSlider = (
          <Slider
            ref="process"
            className="process_bar"
            value={this.state.percent}
            min={1}
            tipFormatter={this.tipformate.bind(this)}
            style={transformStyle.process}
          />
        ));
    return (
      <div id="playbox" style={transformStyle.box}>
        {showPlaybox && (
          <Button
            className="box_shut"
            shape="circle"
            icon="close"
            onClick={this.shutBox.bind(this)}
          />
        )}

        <div className="ant_slider_bar">{proSlider}</div>
        <div className="playbox_content" style={transformStyle.content}>
          {showPlaybox && (
            <Lyric
              offsetHeight={this.state.baseOffsetHeight}
              offsetWidth={this.state.baseOffsetWidth}
              currentTime={this.state.currentTime}
            />
          )}
          <div
            className="left_side"
            style={isFm ? { width: "84px" } : { width: "128px" }}
          >
            {!showPlaybox && (
              <Changer
                text2="&#xe868;"
                text1="&#xe6b1;"
                value={this.props.Playbox.isFm}
                clickHandler={this.switchModeHandler}
              />
            )}
            <InfoBox
              list={
                this.props.Playbox.isFm
                  ? this.props.Playbox.fmList
                  : this.props.Playbox.curList
              }
              transformer={this.transformer.bind(this)}
              index={this.props.Playbox.curIndex}
              transformStyle={transformStyle}
              showPlaybox={showPlaybox}
              isPlaying={isPlaying}
            />
          </div>

          <div
            className="control_center"
            ref="control_center"
            style={transformStyle.control}
          >
            <Button
              shape="circle"
              icon="download-custom"
              size="small"
              id="download-custom"
              onClick={this.downloadHandler.bind(this)}
            />
            <a
              href={curMusicUrl}
              {...download}
              ref="download"
              style={{ display: "none" }}
            />
            {!isFm && (
              <Button
                shape="circle"
                onClick={
                  curList.length ? this.prevSong.bind(this) : () => false
                }
                icon="left"
                size="small"
              />
            )}
            <Button
              shape="circle"
              className="play"
              onClick={
                curList.length || isFm
                  ? this.playHandler.bind(this)
                  : () => false
              }
              icon={isPlaying ? "pause-circle" : "play-circle"}
              size="small"
            />
            <Button
              shape="circle"
              onClick={
                curList.length || isFm
                  ? this.nextSong.bind(this)
                  : this.changeFmIndexHandler.bind(this)
              }
              icon="right"
              size="small"
            />
            {!isFm && (
              <Button
                shape="circle"
                icon="delete"
                size="small"
                onClick={
                  curList.length
                    ? this.delHandler.bind(this, curIndex)
                    : () => false
                }
              />
            )}
          </div>

          <div className="right_side" style={transformStyle.right}>
            <Dropdown overlay={menu} placement="topCenter" trigger={["click"]}>
              <Button
                shape="circle"
                size="small"
                icon="sound"
                className="btns"
              />
            </Dropdown>
            {!isFm && (
              <Switch
                checkedChildren={curList.length}
                unCheckedChildren={curList.length}
                onChange={this.toggleListHandler.bind(this)}
                checked={this.props.Playbox.showList}
                size="large"
              />
            )}
          </div>
        </div>
        <PlayboxList
          isFm={this.props.Playbox.isFm}
          empty={this.emptyListHandler.bind(this)}
          show={this.props.Playbox.showList}
          curList={this.props.Playbox.curList}
          curIndex={this.props.Playbox.curIndex}
          changeMusicIndex={this.changeMusicIndexHandler.bind(this)}
          changeFmIndex={this.changeFmIndexHandler.bind(this)}
          delHandler={this.delHandler.bind(this)}
          showPlaybox={showPlaybox}
        />
      </div>
    );
  }
}
