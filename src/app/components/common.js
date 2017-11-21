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
          </div>
          <div className="album_info">
            <p className="album_info_name">{this.props.albumName}</p>
            <p className="album_info_playCount">{this.props.albumPlayCount}</p>
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
      return <div className="recommand_playlist">{lis}</div>;
    } else {
      return <h1>loading...</h1>;
    }
  }
}
