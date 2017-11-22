import React from "react";

export default class List extends React.Component {
  constructor() {
    super();
  }
  componendidUpdate() {}

  render() {
    let lists = this.props.songs.map((song, index) => {
      return (
        <div className="list_row row" key={index}>
          <div className="list_col_body col-xs-4 list_col_name">
            <span>{index + 1}</span>
            {song.name}
          </div>
          <div className="list_col_body col-xs-1">{song.artists[0].name}</div>
          <div className="list_col_body col-xs-1">{song.duration}</div>
          <div className="list_col_body col-xs-3">
            <a href={"/#/album?id=" + song.album.id}>{song.album.name}</a>
          </div>
          <div className="list_col_body col-xs-3">
            <a href={"/#/mv?id=" + song.mvid}>MV |</a>
            <a
              href="javascript:void(0)"
              onClick={this.props.playHandler}
              data-id={song.id}
            >
              &nbsp;PLAY |
            </a>
            <a href="#">+</a>
          </div>
        </div>
      );
    });
    return (
      <div className="list_table">
        <div className="list_body">
          <div className="list_row_head row">
            <div className="list_col_head col-xs-2" />
            <div className="list_col_head col-xs-4">NAME</div>
            <div className="list_col_head col-xs-2">ARITIST</div>
            <div className="list_col_head col-xs-2">DUR</div>
            <div className="list_col_head col-xs-2">AL</div>
          </div>
          {lists}
        </div>
      </div>
    );
  }
}

{
  /*<div key={index} className="list_row row">
          <div className="col-xs-1">
            <span>{index + 1}</span>
          </div>
          <div className="col-xs-1">{song.name}</div>
          <div className="col-xs-1">{song.artists[0].name}</div>
          <div className="col-xs-1">{song.duration}</div>
          <div className="col-xs-1">
            <a href={"/#/album?id=" + song.album.id}>{song.album.name}</a>
          </div>
          <div className="col-xs-1">
            <a href={"/#/mv?id=" + song.mvid}>MV</a>
          </div>
          <div className="col-xs-1">
            <a
              href="javascript:void(0)"
              onClick={this.props.playHandler}
              data-id={song.id}
            >
              PLAY
            </a>
          </div>
          <div className="col-xs-1">
            <a href="javascript:void(0)">+</a>
          </div>
        </div>*/
}
