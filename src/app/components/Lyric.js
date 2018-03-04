import React from "react";
import { connect } from "react-redux";
import { getLyric } from "../redux/actions";

@connect(store => {
  return {
    Playbox: store.Playbox
  };
})
export default class Lyric extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    const { curList, curIndex } = this.props.Playbox;
    // this.props.dispatch(getLyric(curList[curIndex].id));
  }
  render() {
    const { lyric } = this.props.Playbox;
    const { currentTime } = this.props;
    let lyricText;
    const curIndex =
      lyric.filter(value => currentTime >= value.time).length - 1;
    if (lyric.length > 1) {
      lyricText = lyric.map(({ text }, index) => {
        let hasTime = { className: curIndex === index ? "playing" : "" };
        return (
          <p key={index} {...hasTime}>
            {text}
          </p>
        );
      });
    } else {
      lyricText = lyric[0];
    }
    const boxStyle = {
      height: this.props.offsetHeight + 40 + "px",
      bottom: "0"
    };
    const wrapStyle =
      lyric.length > 1
        ? {
            transform: `translate3d(0px,-${curIndex * 28 + 36}px,0px)`
          }
        : {};
    return (
      <div className="lyric_box" style={boxStyle}>
        <div className="lyric_wraper" style={wrapStyle}>
          {lyricText}
        </div>
      </div>
    );
  }
}
