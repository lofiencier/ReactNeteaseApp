import React from "react";
import { Link } from "react-router-dom";

export class Album extends React.Component {
  render() {
    return (
      <div className="album_cover_bg">
        <Link
          className="album_cover_bg_href"
          to={
            this.props.playlistId
              ? "/playlist?id=" + this.props.playlistId
              : "/album?id=" + this.props.albumId
          }
        >
          <div className="album_cover">
            <img src={this.props.coverUrl} alt="" />
            <div
              className={
                this.props.albumPlayCount
                  ? "album_info_playCount"
                  : "album_info_subType"
              }
            >
              <span>
                {this.props.albumPlayCount
                  ? this.props.albumPlayCount
                  : this.props.subType}
              </span>
            </div>
          </div>
          <div className="album_info">
            <p className="album_info_name">{this.props.albumName}</p>
          </div>
        </Link>
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
        let { playCount } = song;
        if (playCount > 10000) {
          playCount = parseInt(playCount / 10000) + "W";
        }
        return (
          <Album
            key={song.id}
            playlistId={song.id}
            coverUrl={song.picUrl}
            albumName={song.name}
            albumPlayCount={playCount}
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
          <img src={this.props.coverUrl + "?param=270y270"} alt="" />
        </div>
        <div className="album_info_details">
          <p className="album_info_name">
            <i>{this.props.type}</i>
            {this.props.name}
          </p>
          <span
            className={
              this.props.company ? "album_company" : "playlist_creator"
            }
          >
            {this.props.company
              ? this.props.company
              : "创建者:" + this.props.creator}
          </span>
          <br />
          <span
            className={
              this.props.time ? "album_public_time" : "playlist_play_count"
            }
          >
            {this.props.time
              ? "发行时间：" +
                new Date(
                  parseInt(("/Date(" + this.props.time + ")/").substr(6, 13))
                ).toLocaleDateString()
              : "播放量：" + this.props.playCount}
          </span>
          <div className="album_action_playall">
            <a href="javascript:void(0)">
              <p>PLAY ALL</p>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export class Blur_bg extends React.Component {
  render() {
    return (
      <div className="bg_content">
        <div className="album_page_bg">
          <img src="../static/images/banner.jpg" alt="" id="blurImg" />
        </div>
        <div className="canvasHolder">
          <canvas id="album_blur_canvas" />
        </div>
      </div>
    );
  }
}

export class HotAlbums extends React.Component {
  constructor() {
    super();
    this.state = {
      result: []
    };
  }
  componentDidMount() {
    let that = this;
    fetch(
      `http://localhost:3000/artist/album?id=${this.props.artist_id}&limit=5`
    )
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        data = data.hotAlbums.map(album => {
          let { id, name, picUrl, subType } = album;
          return {
            id: id,
            name: name,
            picUrl: picUrl,
            subType: subType
          };
        });
        that.setState({ result: data });
      });
  }
  componentWillUnmount() {
    this.setState({ result: [] });
  }
  render() {
    let ele = this.state.result.map((album, index) => (
      <Album
        key={index}
        albumId={album.id}
        albumName={album.name}
        coverUrl={album.picUrl + "?param=140y140"}
        subType={album.subType}
      />
    ));
    return <div className="artist_hot_albums">{ele}</div>;
  }
}
