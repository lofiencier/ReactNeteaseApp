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
          <div className="list_col_body col-xs-4 album_user_actions">
            <a href={"/#/album?id=" + song.album.id}>{song.album.name}</a>
          </div>
          <div className="list_col_body col-xs-2 row">
            <a href={"/#/mv?id=" + song.mvid} className="col-xs-3">
              M{" "}
            </a>
            <a
              href="javascript:void(0)"
              onClick={this.props.playHandler}
              data-id={song.id}
              className="col-xs-3"
            >
              &nbsp;P
            </a>
            <a href="#" className="col-xs-3">
              D&nbsp;
            </a>
            <a href="#" className="col-xs-3">
              +
            </a>
          </div>
        </div>
      );
    });
    return (
      <div className="list_table">
        <div className="list_body">
          <div className="list_row_head row">
            <div className="list_col_head col-xs-3 col-xs-offset-1">NAME</div>
            <div className="list_col_head col-xs-1">ARITIST</div>
            <div className="list_col_head col-xs-1">DUR</div>
            <div className="list_col_head col-xs-4">AL</div>
            <div className="list_col_head col-xs-2">ACTIONS</div>
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
