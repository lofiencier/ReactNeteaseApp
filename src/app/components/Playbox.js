import React from "react";
import { connect } from "react-redux";
import {
  switchMode,
  unshift_song_list,
  fetchSingleSong,
  toggleList,
  changeCurIndex,
  emptyList,
  changeIndex,
  togglePlayState,
  changeVolume,
  changePlayPosition,
  delSong
} from "../redux/actions";
import { Changer, PlayboxList, InfoBox } from "../components/common";
import AudioThunk from "../components/AudioThunk";
import { Icon, Switch, Button, Menu, Dropdown, Slider } from "antd";

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
      percent: 0,
      slideMode: false,
      localUrl: ""
    };
    this.switchModeHandler = this.switchModeHandler.bind(this);
    this.changeIndexHandler = this.changeIndexHandler.bind(this);
  }
  componentDidMount() {
    this.refs.process.rcSlider.sliderRef.addEventListener(
      "mousedown",
      this.startSlide.bind(this),
      false
    );
    document.addEventListener("mouseup", this.stopSlide.bind(this), false);
  }
  componentWillUnmount() {
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

  switchModeHandler() {
    this.props.dispatch(switchMode(this.props.Playbox.isFm));
  }
  toggleListHandler() {
    this.props.dispatch(toggleList(this.props.Playbox.showList));
  }
  changeIndexHandler(e) {
    e = e || window.event;
    let index = e.currentTarget.getAttribute("data-index");
    let id = e.currentTarget.getAttribute("data-id");
    console.log(index, id);
    this.props.dispatch(changeIndex(index));
  }
  timeUpdateHandler(e) {
    e = e || window.event;
    // console.log(e.path[0].currentTime);
    let dur = e.path[0].duration;
    let curTime = e.path[0].currentTime;
    let play_percent = parseInt(curTime / dur * 10000) / 100 || 0;
    // this.refs.process.
    this.setState({
      percent: play_percent
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
    this.props.dispatch(changeIndex(parseInt(this.props.Playbox.curIndex) - 1));
  }
  nextSong() {
    this.props.dispatch(changeIndex(parseInt(this.props.Playbox.curIndex) + 1));
  }
  emptyListHandler() {
    this.props.dispatch(emptyList());
  }
  playHandler() {
    this.props.dispatch(togglePlayState());
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
  render() {
    const {
      curList,
      curIndex,
      isPlaying,
      isFm,
      AudioDom,
      curMusicUrl
    } = this.props.Playbox;
    const style = {
      height: "90%",
      margin: "2px 10px",
      padding: "2px 4px"
    };
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
          />
        ))
      : (proSlider = (
          <Slider
            ref="process"
            className="process_bar"
            value={this.state.percent}
            min={1}
            tipFormatter={this.tipformate.bind(this)}
          />
        ));
    return (
      <div id="playbox">
        <AudioThunk timeUpdateHandler={this.timeUpdateHandler.bind(this)} />
        {proSlider}
        <div className="playbox_content">
          <div
            className="left_side"
            style={isFm ? { width: "84px" } : { width: "128px" }}
          >
            <Changer
              text1="MU"
              text2="FM"
              value={this.props.Playbox.isFm}
              clickHandler={this.switchModeHandler}
            />
            <InfoBox
              list={
                this.props.Playbox.isFm
                  ? this.props.Playbox.fmList
                  : this.props.Playbox.curList
              }
              index={this.props.Playbox.curIndex}
              transformer={this.transformer}
            />
          </div>

          <div className="control_center" ref="control_center">
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
                curList.length || isFm ? this.nextSong.bind(this) : () => false
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

          <div className="right_side">
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
          changeIndexHandler={this.changeIndexHandler.bind(this)}
          delHandler={this.delHandler.bind(this)}
        />
      </div>
    );
  }
}
