import React from "react";
import { Link } from "react-router-dom";
import { Radio, Icon } from "antd";

const fetch_config = {
  method: "GET",
  mode: "cors",
  credentials: "include"
};

export class Album_hoz extends React.Component {
  render() {
    return (
      <div className="user_collections_item">
        <Link to={"/mine?playlist=" + this.props.id}>
          <div className="item_cover">
            <img src={this.props.url + "?param=38y38"} alt="" />
          </div>
          <div className="item_info">
            <p>{this.props.name}</p>
            <small>{this.props.count}</small>
          </div>
        </Link>
      </div>
    );
  }
}

export class UserInfo extends React.Component {
  render() {
    let i = this.props.cols;
    let lis = <span>LOADING...</span>;
    if (i) {
      lis = i.map((playlist, index) => {
        return (
          <Album_hoz
            key={index}
            id={playlist.playlistId}
            name={playlist.playlistName}
            count={playlist.trackCount}
            url={playlist.coverImgUrl}
          />
        );
      });
    }
    return (
      <div className="user_root_content">
        <div className="userinfo_wrap">
          <div className="avatar">
            <img src={this.props.profile.avatarUrl + "?param=80y80"} alt="" />
          </div>
          <div className="user_info">
            <p>Name</p>
            <div className="social_info row">
              <span className="social_info_deltail col-xs-4">
                NES<br />1
              </span>
              <span className="social_info_deltail col-xs-4">
                FOLLOW<br />3
              </span>
              <span className="social_info_deltail col-xs-4">
                FANS<br />2
              </span>
            </div>
          </div>
        </div>
        <div className="user_collections_wrap">
          <div className="user_collections">{lis}</div>
        </div>
      </div>
    );
  }
}
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
            coverUrl={song.picUrl + "?param=170y170"}
            albumName={song.name}
            albumPlayCount={playCount}
          />
        );
      });
      return (
        <div className="recommand_playlist">
          <div className="recommand_wrap">
            <div className="index_title">
              <p className="feather_title">NEW RELEAST FOR YOU</p>
            </div>
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
    return (
      <div className="artist_hot_albums">
        <div className="hot_album_wrap">{ele}</div>
      </div>
    );
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

export class LoginBox extends React.Component {
  render() {
    return (
      <div className="loginbox_root_content">
        <form method="GET" onSubmit={this.props.submitHandler}>
          <input
            type="text"
            placeholder="enter your cellphone"
            name="cellphone"
          />
          <label htmlFor="cellphone">PHONE:</label>
          <input
            type="text"
            placeholder="enter your password"
            name="password"
          />
          <label htmlFor="password">PASSWORD:</label>
          <input type="radio" value="false" name="remember" />
          <label htmlFor="remenber" />
          <input type="submit" value="SUBMIT" />
        </form>
      </div>
    );
  }
}

export class Pagination extends React.Component {
  constructor() {
    super();
    this.state = {
      index: 0
    };
  }
  changeIndex(e) {
    e = e || window.event();
    // console.log();
    this.setState({ index: parseInt(e.target.getAttribute("data-i")) });
  }

  render() {
    let total = this.props.total;
    let limit = this.props.limit;
    let offset = this.props.offset;
    let pagesum = Math.ceil(total / limit);
    let lis = [];
    let zdots = <span className="zdots">...</span>;
    for (let i = 0; i < 9; i++) {
      lis.push(
        <a
          href="javascript:void(0)"
          className={
            this.state.index == i
              ? "pagination_index active"
              : "pagination_index"
          }
          data-i={i}
          key={i}
        >
          {this.state.index + 1}
        </a>
      );
    }
    return (
      <div className="pagination_content" onClick={this.changeIndex.bind(this)}>
        <a
          href="javascript:void(0)"
          className="pagination_action"
          data-i={this.state.index - 1}
        >
          上一页
        </a>
        {lis}
        <a
          href="javascript:void(0)"
          className="pagination_action"
          data-i={this.state.index + 1}
        >
          下一页
        </a>
      </div>
    );
  }
}

export class Day extends React.Component {
  constructor() {
    super();
    this.state = {
      view: [],
      list: []
    };
  }
  componentWillMount() {
    fetch(`//localhost:3000/recommend/songs`, fetch_config)
      .then(res => res.json())
      .then(data => {
        data = data.recommend;
        data = data.map(i => {
          let { duration } = i;
          duration =
            parseInt(duration / 1000 / 60).toString() +
            ":" +
            (((duration / 1000) % 60) / 100)
              .toString()
              .split("")
              .slice(2, 4)
              .join("");
          return { ...i, duration };
        });
        this.setState({ list: data });
        // let {name,id,duration,artist,album}
      });
  }
  componentWillReceiveProps(nextState) {
    if (this.state.list != nextState.list) {
    }
  }
  render() {
    var lis = [];
    if (this.props.loged) {
      if (this.state.list.length != 0) {
        // this.setState();
        lis = (
          <ListFloat
            noHead={true}
            songs={this.state.list}
            playHandler={this.playHandler}
          />
        );
      } else {
        lis = <h1>Loading...</h1>;
      }
      return (
        <div className="day_recommand">
          <div className="day_recommand_wrap">
            <div className="index_title">
              <h1>
                <a href="javascript:void(0)">DAILY</a>
              </h1>
            </div>
            {lis}
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export class ListFloat extends React.Component {
  constructor() {
    super();
  }
  componendidUpdate() {}

  render() {
    let lists = this.props.songs.map((song, index) => {
      return (
        <div
          className="list_row row col-xs-5 col-xs-offset-1-right"
          key={index}
        >
          <div className="list_col_body col-xs-4 list_col_name">
            <span>{index + 1}</span>
            {song.name}
          </div>
          <div className="list_col_body col-xs-1">{song.artists[0].name}</div>
          <div className="list_col_body col-xs-1">{song.duration}</div>
          <div className="list_col_body col-xs-4 album_user_actions">
            <a href={"/#/album?id=" + song.album.id}>{song.album.name}</a>
          </div>
          <div className="list_col_body actions col-xs-2 row">
            <a href="#" className="col-xs-3">
              +
            </a>

            <a href="#" className="col-xs-3">
              D&nbsp;
            </a>
            <a
              href="javascript:void(0)"
              onClick={this.props.playHandler}
              data-id={song.id}
              data-i={index}
              className="col-xs-3"
            >
              &nbsp;P
            </a>
            <a
              href={"/#/mv?mvid=" + song.mvid}
              className="col-xs-3"
              style={song.mvid ? { display: "block" } : { display: "none" }}
            >
              M{" "}
            </a>
          </div>
        </div>
      );
    });
    return (
      <div className="list_table">
        <div className="list_body">
          <div
            className="list_row_head row"
            style={
              this.props.noHead ? { display: "none" } : { display: "block" }
            }
          >
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

export class List extends React.Component {
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
          <div className="list_col_body actions col-xs-2 row">
            <a href="#" className="col-xs-3">
              +
            </a>

            <a href="#" className="col-xs-3">
              D&nbsp;
            </a>
            <a
              href="javascript:void(0)"
              onClick={this.props.playHandler}
              data-id={song.id}
              data-i={index}
              className="col-xs-3"
            >
              &nbsp;P
            </a>
            <a
              href={"/#/mv?mvid=" + song.mvid}
              className="col-xs-3"
              style={song.mvid ? { display: "block" } : { display: "none" }}
            >
              M{" "}
            </a>
          </div>
        </div>
      );
    });
    return (
      <div className="list_table">
        <div className="list_body row">
          <div
            className="list_row_head row"
            style={
              this.props.noHead ? { display: "none" } : { display: "block" }
            }
          >
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

export class TopAlbum extends React.Component {
  constructor() {
    super();
    this.fetchHandler = this.fetchHandler.bind(this);
    this.state = {
      result: []
    };
  }
  componentWillMount() {
    this.fetchHandler(0);
  }
  fetchHandler(offset) {
    fetch(`//localhost:3000/top/album?limit=6&offset=${offset}`, fetch_config)
      .then(res => res.json())
      .then(data => {
        let albums = data.albums;
        this.setState({ result: albums });
      });
  }
  shuffle() {
    let offset = parseInt(Math.random() * 80);
    console.log(offset);
    this.fetchHandler(offset);
  }
  render() {
    var lis = [];
    if (this.state.result.length) {
      this.state.result.map(song => {
        lis.push(
          <Album
            key={song.id}
            albumId={song.id}
            coverUrl={song.picUrl + "?param=170y170"}
            albumName={song.name}
            subType={song.subType}
          />
        );
      });
      return (
        <div className="index_hot_albums">
          <div className="recommand_playlist">
            <div className="recommand_wrap">
              <div className="index_title">
                <h1 className="feather_title">
                  <a
                    href="javascript:void(0)"
                    onClick={this.shuffle.bind(this)}
                  >
                    HOT ALBUMS
                  </a>
                </h1>
              </div>
              {lis}
            </div>
          </div>
        </div>
      );
    }
    return null;
  }
}

export class Billboard extends React.Component {
  constructor() {
    super();
    this.fetchHandler = this.fetchHandler.bind(this);
    this.state = {
      brandNew: [],
      hotSong: [],
      raise: []
    };
  }
  renderList(arr) {
    let result = [];
    result = arr.map((item, index) => {
      if (index == 0) {
        return (
          <a className="billboard_list_child first row" key={index}>
            <span className="index col-xs-1">{"0" + (index + 1 - "")}</span>
            <span className="pic col-xs-3">
              <img src={item.album.picUrl + "?param=40y40"} alt="" />
            </span>
            <span className="info col-xs-7">
              <p>{item.name}</p>
              <small>{item.artists[0].name}</small>
            </span>
            <Icon type="caret-right" />
          </a>
        );
      } else {
        return (
          <a className="billboard_list_child row" key={index}>
            <span className="index col-xs-1">{"0" + (index + 1 - "")}</span>

            <span className="col-xs-10">{item.name}</span>
            <span className="col-xs-1">
              <Icon type="caret-right" />
            </span>
          </a>
        );
      }
    });
    return result;
  }
  componentWillMount() {
    let p1 = this.fetchHandler(3, "brandNew");
    let p2 = this.fetchHandler(5, "hotSong");
    let p3 = this.fetchHandler(2, "raise");
    Promise.all([p1, p2, p3]).then(data => {
      this.setState({
        brandNew: data[0].result.tracks,
        hotSong: data[1].result.tracks,
        raise: data[2].result.tracks
      });
    });
  }
  fetchHandler(idx, type) {
    return fetch(
      `//localhost:3000/top/list?idx=${idx}`,
      fetch_config
    ).then(res => res.json());
  }
  render() {
    var list1 = [],
      list2 = [],
      list3 = [];
    if (
      this.state.brandNew.length &&
      this.state.hotSong.length &&
      this.state.raise.length
    ) {
      let brandNew = this.state.brandNew;
      let hotSong = this.state.hotSong;
      let raise = this.state.raise;
      brandNew.length = 7;
      hotSong.length = 7;
      raise.length = 7;
      list1 = this.renderList(brandNew);
      list2 = this.renderList(hotSong);
      list3 = this.renderList(raise);
    }
    return (
      <div className="billboard_content">
        <div className="billboard_wrap">
          <div className="billboard_list_wrap">
            <div className="billboard_list red">
              <div className="billboard_head red">
                <h1 className="title">云音乐飙升榜</h1>
                <Icon type="play-circle-o" className="title_icon" />
              </div>
              {list1}
            </div>
            <div className="billboard_list yellow">
              <div className="billboard_head yellow">
                <h1 className="title">UK排行榜周榜</h1>
                <Icon type="play-circle-o" className="title_icon" />
              </div>
              {list2}
            </div>
            <div className="billboard_list green">
              <div className="billboard_head green">
                <h1 className="title">原创歌曲榜</h1>
                <Icon type="play-circle-o" className="title_icon" />
              </div>
              {list3}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export class Boutique extends React.Component {
  constructor() {
    super();
    this.fetchHandler = this.fetchHandler.bind(this);
    this.state = {
      list: []
    };
    this.static = {
      lang: ["华语", "欧美", "日语", "韩语", "粤语", "小语种"]
    };
  }
  componentWillMount() {
    this.fetchHandler("华语");
  }
  fetchHandler(type) {
    fetch(
      `//localhost:3000/top/playlist/highquality?limit=6&cat=${type}`,
      fetch_config
    )
      .then(res => res.json())
      .then(data => {
        this.setState({ list: data.playlists });
      });
  }

  changeCat(e) {
    this.fetchHandler(this.static.lang[e.target.value]);
  }
  render() {
    const RadioButton = Radio.Button;
    const RadioGroup = Radio.Group;
    var lis = [];
    if (this.state.list.length) {
      lis = this.state.list.map(song => {
        let { playCount } = song;
        if (playCount > 10000) {
          playCount = parseInt(playCount / 10000) + "W";
        }
        return (
          <Album
            key={song.id}
            playlistId={song.id}
            coverUrl={song.coverImgUrl + "?param=170y170"}
            albumName={song.name}
            albumPlayCount={playCount}
          />
        );
      });
      return (
        <div className="index_boutique">
          <div className="recommand_playlist">
            <div className="recommand_wrap">
              <div className="index_title">
                <h1 className="feather_title">BOUTIQUE</h1>
                <RadioGroup
                  defaultValue="0"
                  size="small"
                  className="boutique_radio_group"
                  onChange={this.changeCat.bind(this)}
                >
                  <RadioButton value="0">{this.static.lang[0]}</RadioButton>
                  <RadioButton value="1">{this.static.lang[1]}</RadioButton>
                  <RadioButton value="2">{this.static.lang[2]}</RadioButton>
                  <RadioButton value="3">{this.static.lang[3]}</RadioButton>
                  <RadioButton value="4">{this.static.lang[4]}</RadioButton>
                  <RadioButton value="5">{this.static.lang[5]}</RadioButton>
                </RadioGroup>
              </div>
              <div className="clear_both">{lis}</div>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}
