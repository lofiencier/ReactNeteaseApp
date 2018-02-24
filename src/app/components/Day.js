import React from "react";
import { connect } from "react-redux";
import { ListFloat } from "../components/common";
import { unshift_song_list, push_song_list } from "../redux/actions";

const fetchConfig = {
  withCredentials: true
};

@connect(store => {
  return {
    user: store.user
  };
})
export default class Day extends React.Component {
  constructor() {
    super();
    this.state = {
      view: [],
      list: []
    };
  }
  componentWillMount() {
    axios.get(`/recommend/songs`, fetchConfig).then(({ data }) => {
      data = data.recommend;
      data = data.map(i => {
        let { duration } = i;
        duration =
          parseInt(duration / 1000 / 60).toString() +
          ":" +
          (((duration / 1000) % 60) / 100)
            .toString()
            .split("")
            .slice(2, 4)
            .join("");
        return { ...i, duration };
      });
      this.setState({ list: data });
      // let {name,id,duration,artist,album}
    });
  }
  componentWillReceiveProps(nextState) {
    if (this.state.list != nextState.list) {
    }
  }
  playSong(e) {
    e = e || window.event;
    var id = e.currentTarget.getAttribute("data-id");
    this.props.dispatch(unshift_song_list(id));
  }
  addSong(e) {
    e = e || window.event;
    var id = e.currentTarget.getAttribute("data-id");
    this.props.dispatch(push_song_list(id));
  }
  downSong() {}
  render() {
    var lis = [];
    if (this.props.loged) {
      if (this.state.list.length != 0) {
        // this.setState();
        lis = (
          <ListFloat
            noHead={true}
            songs={this.state.list}
            downSong={this.downSong.bind(this)}
            addSong={this.addSong.bind(this)}
            playSong={this.playSong.bind(this)}
          />
        );
      } else {
        lis = <h1>Loading...</h1>;
      }
      return (
        <div className="day_recommand">
          <div className="day_recommand_wrap">
            <div className="index_title">
              <h1>
                <a href="javascript:void(0)">DAILY</a>
              </h1>
            </div>
            {lis}
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}
