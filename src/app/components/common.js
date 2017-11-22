import React from "react";

export class Album extends React.Component {
  render() {
    return (
      <div className="album_cover_bg">
        <a
          className="album_cover_bg_href"
          href={"/#/playlist?id=" + this.props.playlistId}
        >
          <div className="album_cover">
            <img src={this.props.coverUrl} alt="" />
            <div className="album_info_playCount">
              <span>
                {parseInt(this.props.albumPlayCount) > 10000
                  ? parseInt(this.props.albumPlayCount / 10000) + "W"
                  : this.props.albumPlayCount}
              </span>
            </div>
          </div>
          <div className="album_info">
            <p className="album_info_name">{this.props.albumName}</p>
          </div>
        </a>
      </div>
    );
  }
}

export class Recommand extends React.Component {
  constructor() {
    super();
    this.state = {
      songs: []
    };
    this.fetchAlbums = this.fetchAlbums.bind(this);
  }
  componentDidMount() {
    this.fetchAlbums();
  }
  fetchAlbums() {
    var that = this;
    fetch("http://localhost:3000/personalized")
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        // return data
        that.setState({ songs: data.result });
      });
  }
  render() {
    if (this.state.songs.length != 0) {
      let lis = this.state.songs.map(song => {
        return (
          <Album
            key={song.id}
            playlistId={song.id}
            coverUrl={song.picUrl}
            albumName={song.name}
            albumPlayCount={song.playCount}
          />
        );
      });
      return (
        <div className="recommand_playlist">
          <div className="recommand_wrap">
            <p className="feather_title">New Releast For You</p>
            {lis}
          </div>
        </div>
      );
    } else {
      return <h1>loading...</h1>;
    }
  }
}

export class Album_info extends React.Component {
  render() {
    return (
      <div className="album_info">
        <div className="album_info_cover">
          <img src={this.props.coverUrl} alt="" />
        </div>
        <div className="album_info_descrition">
          <p className="album_info_name">
            <i>ALBUM</i>
            {this.props.name}
          </p>
          <span className="album_company">
            发行：{this.props.company ? this.props.company : "未知"}
          </span>
          <br />
          <span className="album_public_time">
            发行时间：{new Date(
              parseInt(("/Date(" + this.props.time + ")/").substr(6, 13))
            ).toLocaleDateString()}
          </span>
          <hr />
          <p className="album_description">
            <small>
              简介：{this.props.description
                ? this.props.description
                    .split("")
                    .splice(0, 300)
                    .join("")
                : "无简介"}
            </small>
          </p>
        </div>
      </div>
    );
  }
}
