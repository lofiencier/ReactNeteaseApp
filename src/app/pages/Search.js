import React from "react";
import List from "../components/list";
import { connect } from "react-redux";
import fetchList from "../actions/fetchList";

@connect(store => {
  return {
    curShowList: store.curShowList
  };
})
export default class Search extends React.Component {
  constructor() {
    super();
  }

  submitHandler(e) {
    e.preventDefault();
    let keywords = document.getElementById("song_name").value;
    this.props.dispatch(fetchList(keywords));
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submitHandler.bind(this)}>
          <label htmlFor="song_name" />
          <input type="text" id="song_name" />
          <input type="submit" />
        </form>
        <List songs={this.props.curShowList.targetList} />
      </div>
    );
  }
}
