import React from "react";

function initialState() {
  let AudioDom = document.createElement("Audio");

  return {
    searchlist: {
      fetching: false,
      fetched: false,
      err: null,
      songs: [],
      songCount: 0,
      offset: 1
    },
    Playbox: {
      AudioDom: AudioDom,
      fetching: false,
      fetched: false,
      err: null,
      showList: false,
      isFm: false,
      isPlaying: false,
      curIndex: NaN,
      volume: 0.1,
      curList: [],
      fmList: [],
      fm_preload: [],
      curMusicUrl: "",
      showPlaybox: false,
      lyric: []
    },
    playlist: {
      fetching: false,
      fetched: false,
      err: null,
      name: "",
      playCount: NaN,
      coverImgUrl: "",
      description: "",
      creator: {},
      songs: [],
      songCount: NaN,
      view: <h1>Loading...</h1>
    },
    album: {
      fetching: false,
      fetched: false,
      err: null,
      album: [],
      songs: [],
      artistId: NaN,
      view: <h1>Loading...</h1>
    },
    artist: {
      fetching: false,
      fetched: false,
      err: null,
      data: []
    },
    user: {
      loged: false,
      loging: false,
      showLogin: false,
      collections: [],
      curPlaylist: [],
      profile: {}
    }
  };
}
export default initialState();
