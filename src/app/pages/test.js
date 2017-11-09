import React from "react";

export default class Test extends React.Component {
  constructor() {
    super();
  }

  fetchHandler(keywords, that) {
    fetch(`http://localhost:3000/api/search?keywords=${keywords}`, {
      method: "GET",
      mode: "cors"
    })
      .then(function(res) {
        console.log("Fetching...");
        return res.json();
      })
      .then(function(data) {
        console.log("data from Form", data);
        that.setState({
          cur_song_list: data.result.songs
        });
      });
  }

  render() {
    return (
      <div>
        <h3>API Test Mode</h3>
        <label htmlFor="url">URL</label>
        <input type="text" id="url" name="url" />
        <br />
        <label htmlFor="first_param">第一个参数</label>
        <input type="text" id="first_param" name="first_param" />
        <br />
        <label htmlFor="second_param">第二个参数</label>
        <input type="text" id="second_param" name="second_param" />
        <br />
        <button id="btn1">提交</button>
        <div id="result" style={{ paddingTop: "70px" }}>
          <textarea name="" id="" cols="100" rows="20" />
        </div>
        <br />
        <a href="https://binaryify.github.io/NeteaseCloudMusicApi/#/">docs</a>
      </div>
    );
  }
}
