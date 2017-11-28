import React from "react";

export default class PlayBoxList extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {}
  render() {
    return (
      <div
        className="playbox_list_content"
        style={{
          height: document.documentElement.clientHeight - 60 - 61 + "px"
        }}
      />
    );
  }
}
