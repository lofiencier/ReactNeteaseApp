import React from "react";

function initialState() {
  let AudioDom = document.createElement("Audio");

  return {
    searchlist: {
      fetching: false,
      fetched: false,
      err: null,
      songs: [],
      songCount: NaN
    },
    Playbox: {
      AudioDom: AudioDom,
      fetching: false,
      fetched: false,
      err: null,
      showlist: false,
      isFm: false,
      isPlaying: false,
      curIndex: NaN,
      volume: 1,
      curList: [],
      fmList: [],
      fm_preload: []
    },
    playlist: {
      fetching: false,
      fetched: false,
      err: null,
      name: "",
      playCount: NaN,
      coverImgUrl: "",
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
      collections: [],
      curPlaylist: []
    }
  };
}
export default initialState();
