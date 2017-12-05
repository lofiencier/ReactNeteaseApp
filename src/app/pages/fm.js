import React from "react";

export default class FmView extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    let ids = [];
    document.onclick = function() {
      fetch(`//localhost:3000/personal_fm?timestamp=${Date.now()}`, {
        method: "GET",
        mode: "cors",
        credentials: "include"
      })
        .then(res => res.json())
        .then(data => {
          // ids.push(["0"].id)
          data.data.map(e => {
            ids.push(e.id);
          });
          console.log(ids);
          let id = ids.join(",");
          fetch(`http://localhost:3000/music/url?id=${id}`, {
            method: "GET",
            mode: "cors"
          })
            .then(res => res.json())
            .then(data => {
              console.log(data);
              ids = [];
            });
        });
    };
  }
  render() {
    return null;
  }
}
