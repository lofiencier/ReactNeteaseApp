import React from "react";
import { connect } from "react-redux";
import {
  switchMode,
  unshift_song_list,
  fetchSingleSong,
  toggleList,
  emptyList,
  changeIndex
} from "../redux/actions";
import { Changer, PlayboxList } from "../components/common";
import AudioThunk from "../components/AudioThunk";

@connect(store => {
  return {
    Playbox: store.Playbox
  };
})
export default class Playbox extends React.Component {
  constructor() {
    super();
    this.clickHandler = this.clickHandler.bind(this);
  }
  componentDidMount() {}

  clickHandler() {
    this.props.dispatch(switchMode(this.props.Playbox.isFm));
  }
  toggleListHandler() {
    this.props.dispatch(toggleList(this.props.Playbox.showList));
  }
  playHandler(e) {
    e = e || window.event;
    let index = e.currentTarget.getAttribute("data-index");
    let id = e.currentTarget.getAttribute("data-id");
    this.props.dispatch(changeIndex(index));
  }
  prevOrNext(index) {}
  emptyListHandler() {
    this.props.dispatch(emptyList());
  }

  render() {
    let curList = this.props.Playbox.curList;
    let curIndex = this.props.Playbox.curIndex;
    return (
      <div id="playbox">
        <AudioThunk />
        <div className="song_total_process">
          <div className="song_buffered" />
          <div className="song_played" />
        </div>
        <div className="playbox_content">
          <Changer
            text1="MU"
            text2="FM"
            value={this.props.Playbox.isFm}
            clickHandler={this.clickHandler}
          />
          <div className="song_info">
            <div className="song_cover">
              <img
                src={
                  curList[curIndex]
                    ? curList[curIndex].album.picUrl + "?param=45y45"
                    : "../static/images/bg.jpg"
                }
                alt=""
              />
            </div>
            <div className="song_text">
              <p className="song_name">
                {curList[curIndex] ? curList[curIndex].name : "Random Song"}
              </p>
              <small className="song_artist">
                {curList[curIndex]
                  ? curList[curIndex].artists[0].name
                  : "Random Artist"}
              </small>
            </div>
          </div>
          <div className="control_center">
            <div className="btns isfm">ISFM?</div>
            <div className="btns like">LIKE</div>
            <div className="btns prev">PREV</div>
            <div className="btns play">PLAY</div>
            <div className="btns next">NEXT</div>
            <div className="btns vol">VOLUME</div>
            <div className="btns cur_list">
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
          empty={this.emptyListHandler.bind(this)}
          show={this.props.Playbox.showList}
          curList={this.props.Playbox.curList}
          playHandler={this.playHandler.bind(this)}
        />
      </div>
    );
  }
}
