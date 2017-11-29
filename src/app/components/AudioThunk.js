import React from "react";
import connect from "react-redux";

@connect(store => {
  return {
    Playbox: store.Playbox
  };
})
export default class AudioThunk extends React.Component {
  componentWillReceiveProps(nextProps) {
    console.log(nextProps.curMusicId);
  }
  render() {
    return <div className="audio_thunk" />;
  }
}
