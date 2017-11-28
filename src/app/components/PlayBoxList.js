import React from "react";
import { connect } from "react-redux";

@connect(store => {
  return {
    Playbox: store.Playbox
  };
})
export default class PlayBoxList extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    let ele = document.getElementsByClassName("playbox_list_content")[0];
    ele.addEventListener("mousewheel", function(e) {
      let height = ele.querySelectorAll(".playbox_lit_wrap")[0].clientHeight;
      e = e || window.event;
      e.stopPropagation();
    });
  }
  componentWillReceiveProps(nextProps) {}
  render() {
    let els = (
      <div className="playbox_list_item">
        <span>Empty...</span>
      </div>
    );
    if (this.props.Playbox.curList.length) {
      els = this.props.Playbox.curList.map((song, index) => {
        return (
          <div key={index} className="playbox_list_item">
            <a href="javascipt:void(0)">
              <div className="list_item_cover">
                <span>{index + 1}</span>
                <img src={song.al.picUrl + "?param=44y44"} alt="" />
              </div>
              <div className="list_item_info">
                <span>{song.name}</span>
                <br />
                <small>{song.ar[0].name}</small>
              </div>
              <span style={{ float: "right", lineHeight: "60px" }}>DEL</span>
            </a>
          </div>
        );
      });
    }
    return (
      <div
        className={
          this.props.show
            ? "playbox_list_content"
            : "playbox_list_content hidden"
        }
        style={{
          height: document.documentElement.clientHeight - 60 - 61 + "px"
        }}
      >
        <div className="playbox_lit_wrap">
          <div className="playbox_list_item row">
            <a href="javascipt:void(0)" className="col-xs-6">
              清空
            </a>
            <a href="javascipt:void(0)" className="col-xs-6">
              收藏
            </a>
          </div>
          {els}
        </div>
      </div>
    );
  }
}
