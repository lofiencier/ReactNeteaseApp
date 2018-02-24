import React from "react";
import StackBlur from "stackblur-canvas";
import { Blur_bg } from "../components/common";
export default class MV extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "RANDOM NAME",
      aritistName: "RANDOM ARITIST",
      cover: "",
      urls: [],
      playCount: NaN,
      isPlaying: false
    };
  }
  blurHandler() {
    document.getElementById("blurImg").onload = function() {
      StackBlur.image("blurImg", "album_blur_canvas", 10, false);
    };
  }
  mvplay() {
    let that = this;
    axios
      .get("/mv/url?url=" + this.state.urls["480"], { responseType: "blob" })
      .then(({ data }) => {
        // console.log(URL.createObjectURL(data));
        document.querySelector("#mv_video").src = URL.createObjectURL(data);
        this.setState({ isPlaying: true });
        // this.play();
        document.querySelector("#mv_video").play();
      });
  }
  componentDidMount() {
    this.blurHandler();
    console.log(this.props.location.search);
    let that = this;
    axios
      .get(`//localhost:3000/mv${this.props.location.search}`)
      .then(({ data }) => {
        that.setState({
          name: data.data.name,
          playCount: data.data.playCount,
          urls: data.data.brs,
          aritistName: data.data.artistName,
          cover: data.data.cover
        });
      });
  }
  render() {
    return (
      <div className="root_content">
        <div className="mv_content">
          <div className="mv_content_wrap">
            <div className="info">
              <p className="song_name">
                <span>MV</span>
                {this.state.name}
              </p>
              <p className="song_ar">{this.state.aritistName}</p>
            </div>
            <div className="mv_box">
              <div
                className="mv_cover"
                style={
                  this.state.isPlaying
                    ? { display: "none" }
                    : { display: "block" }
                }
              >
                <div className="mv_cover_mask">
                  <a href="javascript:void(0)" onClick={this.mvplay.bind(this)}>
                    PLAY
                  </a>
                </div>
                <img src={this.state.cover + "?param=864y540"} alt="" />
              </div>
              <video id="mv_video" control="false" autoPlay />
            </div>
          </div>
        </div>
        <Blur_bg />
      </div>
    );
  }
}
