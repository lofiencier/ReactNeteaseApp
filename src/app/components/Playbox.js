import React from "react";
import { connect } from "react-redux";
import {
  switchMode,
  unshift_song_list,
  fetchSingleSong,
  toggleList,
  changeCurIndex,
  emptyList
} from "../redux/actions";
import { Changer, PlayboxList } from "../components/common";

@connect(store => {
  return {
    Playbox: store.Playbox
  };
})
export default class Playbox extends React.Component {
  constructor() {
    super();
    this.clickHandler = this.clickHandler.bind(this);
    this.playHandler = this.playHandler.bind(this);
  }
  componentDidMount() {}

  emptyHandler() {
    this.props.dispatch(emptyList());
  }
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
    console.log(index, id);
    this.props.dispatch(changeCurIndex(index));
  }
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.Playbox.curMusicId &&
      nextProps.Playbox.curMusicId != this.props.Playbox.curMusicId
    ) {
      nextProps.dispatch(unshift_song_list(nextProps.Playbox.curMusicId));
    }
  }
  render() {
    let Props = this.props.Playbox;
    if (Props.curList[Props.curIndex]) {
      console.log(Props.curList[Props.curIndex].al.picUrl);
    }
    return (
      <div id="playbox">
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
                  Props.curList[Props.curIndex]
                    ? Props.curList[Props.curIndex].al.picUrl + "?param=45y45"
                    : "../static/images/bg.jpg"
                }
                alt=""
              />
            </div>
            <div className="song_text">
              <p className="song_name">
                {Props.curList[Props.curIndex]
                  ? Props.curList[Props.curIndex].name
                  : "RandomName"}
              </p>
              <small className="song_artist">
                {Props.curList[Props.curIndex]
                  ? Props.curList[Props.curIndex].ar[0].name
                  : "RandomArtist"}
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
          show={this.props.Playbox.showList}
          curList={this.props.Playbox.curList}
          playHandler={this.playHandler}
          emptyHandler={this.emptyHandler.bind(this)}
        />
      </div>
    );
  }
}
