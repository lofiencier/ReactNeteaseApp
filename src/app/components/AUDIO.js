import React from "react";

export default class Form extends React.Component {
  constructor() {
    super();
  }
  componentDidUpdate() {}
  render() {
    return <audio autoPlay src={this.props.URL} />;
  }
}
