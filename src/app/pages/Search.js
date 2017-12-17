import React from "react";
import { connect } from "react-redux";
import { fetchSearchList, fetchSingleSong } from "../redux/actions";
import StackBlur from "stackblur-canvas";
import { Blur_bg, List } from "../components/common";
import { Pagination } from "antd";
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
  onChange(page, pageSize) {
    // console.log(page);
    this.props.dispatch(fetchSearchList(this.props.location.search, page));
  }
  componentDidMount() {
    this.props.dispatch(fetchSearchList(this.props.location.search, 1));
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.location.search != this.props.location.search) {
      nextProps.dispatch(fetchSearchList(nextProps.location.search, 1));
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
            <div className="pagination_wrap">
              <Pagination
                showQuickJumper
                current={this.props.searchlist.offset}
                total={this.props.searchlist.songCount}
                defaultPageSize={30}
                onChange={this.onChange.bind(this)}
              />
            </div>
          </div>
        </div>
        <Blur_bg />
      </div>
    );
  }
}
