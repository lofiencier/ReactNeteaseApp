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
    Audio: {
      AudioDom: AudioDom,
      fetching: false,
      fetched: false,
      err: null,
      targetURL: ""
    },
    user: {
      isLoged: false,
      userId: NaN,
      userCookie: null,
      avatarImgURL: "",
      nickname: "",
      signature: "",
      info: [],
      loginErr: null,
      collection: [],
      collection_err: null
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
      view: <h1>Loading...</h1>
    }
  };
}
export default initialState();
