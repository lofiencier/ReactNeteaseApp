import React from "react";
import { Link } from "react-router-dom";

export class InfoBox extends React.Component {
  render() {
    return (
      <div className="song_info">
        <div className="song_cover">
          <a href="javascript:void:(0)" onClick={this.props.transformer}>
            <img
              src={
                this.props.list[this.props.index]
                  ? this.props.list[this.props.index].album.picUrl +
                    "?param=45y45"
                  : "../static/images/bg.jpg"
              }
              alt=""
            />
          </a>
        </div>
        <div className="song_text">
          <p className="song_name">
            {this.props.list[this.props.index]
              ? this.props.list[this.props.index].name
              : "Random Song"}
          </p>
          <small className="song_artist">
            {this.props.list[this.props.index]
              ? this.props.list[this.props.index].artists[0].name
              : "Random Artist"}
          </small>
        </div>
      </div>
    );
  }
}
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
            <a href="javascript:void(0)" onClick={this.props.playAllHandler}>
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

export class Changer extends React.Component {
  componentDidUpdate() {}
  render() {
    return (
      <div className="changer_content">
        <a
          className="changer_bg"
          onClick={this.props.clickHandler}
          href="javascript:void(0)"
        >
          <div
            className={this.props.value ? "changer_brick" : "changer_brick fm"}
          />
          <div className="changer_text">
            <p>{this.props.text1}</p>
            <p>{this.props.text2}</p>
          </div>
        </a>
      </div>
    );
  }
}

export class PlayboxList extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    let ele = document.getElementsByClassName("playbox_list_content")[0];
    ele.addEventListener("mousewheel", function(e) {
      let height = ele.querySelectorAll(".playbox_lit_wrap")[0].clientHeight;
      e = e || window.event;
      e.stopPropagation();
    });
  }
  componentWillReceiveProps(nextProps) {}
  render() {
    let els = (
      <div className="playbox_list_item">
        <span>Empty...</span>
      </div>
    );
    if (this.props.curList.length) {
      els = this.props.curList.map((song, index) => {
        return (
          <div key={index} className="playbox_list_item">
            <a
              href="javascript:void(0)"
              className="item_href row"
              onClick={this.props.changeIndexHandler}
              data-id={song.id}
              data-index={index}
            >
              <span className="item_index col-xs-1">{index + 1}</span>
              <div className="list_item_cover col-xs-2">
                <img src={song.album.picUrl + "?param=45y45"} alt="" />
              </div>
              <div className="list_item_info col-xs-6">
                <p className="song_name">{song.name}</p>
                <p className="song_ar">{song.artists[0].name}</p>
              </div>
              <p className="col-xs-1">DEL</p>
            </a>
          </div>
        );
      });
    }
    return (
      <div
        className={
          this.props.show && !this.props.isFm
            ? "playbox_list_content"
            : "playbox_list_content hidden"
        }
        style={{
          height: document.documentElement.clientHeight - 61 + "px"
        }}
      >
        <div className="playbox_lit_wrap">{els}</div>
      </div>
    );
  }
}
