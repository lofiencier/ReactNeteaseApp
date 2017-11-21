import React from "react";

export default class Playbox extends React.Component {
  render() {
    return (
      <div id="playbox">
        <div className="song_total_process">
          <div className="song_buffered" />
          <div className="song_played" />
        </div>
        <div className="playbox_content">
          <div className="song_info">
            <div className="song_cover">
              <img src="../static/images/bg.jpg" alt="" />
            </div>
            <div className="song_text">
              <p className="song_name">Random Song</p>
              <small className="song_artist">Random artist</small>
            </div>
          </div>
          <div className="control_center">
            <div className="btns like">LIKE</div>
            <div className="btns prev">PREV</div>
            <div className="btns play">PLAY</div>
            <div className="btns next">NEXT</div>
            <div className="btns shuffle">SHUFFLE</div>
            <div className="btns vol">VOLUME</div>
            <div className="btns cur_list">LIST</div>
          </div>
        </div>
      </div>
    );
  }
}
