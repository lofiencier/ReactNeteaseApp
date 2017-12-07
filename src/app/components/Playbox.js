import React from "react";
import { connect } from "react-redux";
import {
  switchMode,
  unshift_song_list,
  fetchSingleSong,
  toggleList,
  changeCurIndex,
  emptyList,
  changeIndex
} from "../redux/actions";
import { Changer, PlayboxList, InfoBox } from "../components/common";
import AudioThunk from "../components/AudioThunk";

@connect(store => {
  return {
    Playbox: store.Playbox
  };
})
export default class Playbox extends React.Component {
  constructor() {
    super();
    this.switchModeHandler = this.switchModeHandler.bind(this);
    this.changeIndexHandler = this.changeIndexHandler.bind(this);
  }
  componentDidMount() {}
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
    let play_percent = parseInt(curTime / dur * 10000) / 100 + "%";
    document.getElementById("process_played").style.width = play_percent;

    if (e.currentTarget.readyState == 4) {
      let buffer_percent =
        Math.round(
          e.currentTarget.buffered.end(0) / e.currentTarget.duration * 100
        ) + "%";
      if (buffer_percent != 100) {
        //you need debounce here
        document.getElementById(
          "process_buffered"
        ).style.width = buffer_percent;
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
  render() {
    let curList = this.props.Playbox.curList;
    let curIndex = this.props.Playbox.curIndex;
    return (
      <div id="playbox">
        <AudioThunk timeUpdateHandler={this.timeUpdateHandler} />
        <div className="song_total_process">
          <div className="song_buffered" id="process_buffered" />
          <div className="song_played" id="process_played" />
        </div>
        <div className="playbox_content">
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
          <div className="control_center">
            <div className="btns like">LIKE</div>
            <div className="btns prev">
              <a href="javascript:void(0)" onClick={this.prevSong.bind(this)}>
                PREV
              </a>
            </div>
            <div className="btns play">PLAY</div>
            <div className="btns next">
              <a href="javascript:void(0)" onClick={this.nextSong.bind(this)}>
                NEXT
              </a>
            </div>
            <div className="btns vol">VOLUME</div>
            <div
              className="btns cur_list"
              style={
                this.props.Playbox.isFm
                  ? { display: "none" }
                  : { display: "block" }
              }
            >
              <a
                href="javascript:void(0)"
                onClick={this.toggleListHandler.bind(this)}
              >
                LIST
              </a>
            </div>
          </div>
        </div>
        <PlayboxList
          isFm={this.props.Playbox.isFm}
          empty={this.emptyListHandler.bind(this)}
          show={this.props.Playbox.showList}
          curList={this.props.Playbox.curList}
          changeIndexHandler={this.changeIndexHandler.bind(this)}
        />
      </div>
    );
  }
}
