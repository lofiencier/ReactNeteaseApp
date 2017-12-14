import React from "react";
import List from "../components/list";
import { connect } from "react-redux";
import { fetchSearchList, fetchSingleSong } from "../redux/actions";
import StackBlur from "stackblur-canvas";
import { Blur_bg } from "../components/common";
// import { Pagination } from 'antd';
@connect(store => {
  return {
    searchlist: store.searchlist,
    Audio: store.Audio
  };
})
export default class Search extends React.Component {
  constructor() {
    super();
    this.playHandler = this.playHandler.bind(this);
  }

  // componentWil
  // submitHandler(e) {
  //   e.preventDefault();
  //   let keywords = document.getElementById("song_name").value;
  //   this.props.dispatch(fetchSearchList(keywords));
  // }
  onChange() {}
  componentDidMount() {
    this.props.dispatch(fetchSearchList(this.props.location.search));
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.location.search != this.props.location.search) {
      nextProps.dispatch(fetchSearchList(nextProps.location.search));
    }
  }
  playHandler(e) {
    let song_id = e.currentTarget.getAttribute("data-id");
    this.props.dispatch(fetchSingleSong(song_id));
  }

  render() {
    return (
      <div className="root_content search">
        <div className="search_content_wrap">
          <div className="content_wrap">
            <List
              songs={this.props.searchlist.songs}
              playHandler={this.playHandler}
            />
            {/*<Pagination showQuickJumper defaultCurrent={2} total={500} onChange={this.onChange} />*/}
          </div>
        </div>
        <Blur_bg />
      </div>
    );
  }
}
