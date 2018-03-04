import { combineReducers } from "redux";
import initialState from "./initialState";
import { uniqueArray } from "../utils/common";

export default combineReducers({
  searchlist: searchlistReducer,
  Playbox: PlayboxReducer,
  playlist: playlistReducer,
  album: albumReducer,
  artist: artistReducer,
  user: userReducer
});

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case "TOGGLE_LOGIN_BOX": {
      state.showLogin = !state.showLogin;
      state = { ...state };
      break;
    }
    case "COOKIE_ALIVE": {
      state = { ...state, loged: true, profile: action.payload };
      break;
    }
    case "TRY_LOGIN": {
      state = { ...state, loging: true, loged: false };
      break;
    }
    case "LOG_OUT": {
      state = { ...state, loged: false };
      break;
    }
    case "LOGIN_SUCCESS": {
      state = { ...state, loging: false, loged: true, profile: action.profile };
      break;
    }
    case "LOGIN_REJECT": {
      state = { ...state, loging: false, loged: false, profile: null };
      break;
    }
    case "RECIVED_USER_COLLECTION": {
      state = { ...state, collections: action.playlist };
      break;
    }
    case "RECIEVE_PLAYLIST_NOT_ROUTE": {
      state = { ...state, curPlaylist: action.songs };
    }
  }
  return state;
}
export function albumReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCHING_ALBUMLIST": {
      state = { ...state, fetching: true, songs: [], artistId: NaN };
      break;
    }
    case "RECIEVE_ALBUMLIST": {
      state = {
        ...state,
        fetching: false,
        fetched: true,
        songs: action.songs,
        album: action.album,
        artistId: action.artistId
      };
      break;
    }
    case "FETCH_ALBUMLIST_FAILED": {
      state = { ...state, fetching: false, fetched: false, err: action.err };
      break;
    }
  }
  return state;
}

export function playlistReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCHING_PLAYLIST": {
      state = { ...state, fetching: true };
      break;
    }
    case "RECIEVE_PLAYLIST": {
      state = {
        ...state,
        fetching: false,
        fetched: true,
        name: action.name,
        playCount: action.playCount,
        coverImgUrl: action.coverImgUrl,
        creator: action.creator,
        songCount: action.songCount,
        songs: action.songs,
        description: action.description
      };
      break;
    }
    case "FETCH_PLAYLIST_FAILED": {
      state = { ...state, fetching: false, fetched: false, err: action.err };
      break;
    }
  }
  return state;
}

export function PlayboxReducer(state = initialState, action) {
  switch (action.type) {
    case "UNSHIFT_SONG": {
      // state.curList.push(action.payload);
      let { curList } = state;
      let { payload } = action;
      let arr = [action.payload, ...curList];
      arr = uniqueArray(arr, "id");
      state = { ...state, curList: arr };
      break;
    }
    case "TOGGLE_LIST": {
      state = { ...state, showList: !state.showList };
      break;
    }
    case "CHANGE_INDEX": {
      state = { ...state, curIndex: action.payload };
      break;
    }
    case "START_PLAY": {
      state = { ...state, isPlaying: true };
      break;
    }
    case "STOP_PLAY": {
      state.AudioDom.pause();
      state.AudioDom.currentTime = 0;
      state.AudioDom.src = "";
      state = { ...state, isPlaying: false };
      break;
    }
    case "COVER_MUSIC_LIST": {
      state = { ...state, curList: action.payload };
      break;
    }
    case "DEL_SONG": {
      let { curList } = state;
      const payload = curList.filter((item, index) => index !== action.payload);
      state = { ...state, curList: payload };
      break;
    }
    case "TOGGLE_PLAY_STATUS": {
      let { AudioDom, isPlaying } = state;
      isPlaying ? AudioDom.pause() : AudioDom.play();
      state = { ...state, isPlaying: !state.isPlaying };
      break;
    }
    case "TOGGLE_MODE": {
      state = { ...state, isFm: action.payload };
      break;
    }
    case "RECEIVE_FM_SONG": {
      state = { ...state, fmList: action.payload };
      break;
    }
    case "PRELOAD_FM_SONG": {
      const { fmList } = state;
      const payload = [...fmList, ...action.payload];
      state = { ...state, fmList: payload };
      break;
    }
    case "IMPORT_FM_PRELOAD": {
      state = { ...state, fmList: state.fm_preload };
      break;
    }
    case "DEL_FM_SONG": {
      let { fmList } = state;
      const payload = fmList.filter((item, index) => index !== action.payload);
      state = { ...state, fmList: payload };
      break;
    }
    case "GET_MUSIC_URL": {
      state = { ...state, curMusicUrl: action.payload };
      break;
    }
    case "CHNAGE_FM_INDEX": {
      state = { ...state, curIndex: action.payload };
      break;
    }
    case "CHANGE_PLAY_POSITION": {
      state.AudioDom.currentTime = action.payload;
      break;
    }
    case "CHANGE_VOL": {
      state.AudioDom.volume = action.payload;
      break;
    }
    case "PUSH_SONG": {
      let payload = state.curList.concat(action.payload);
      payload = uniqueArray(payload, "id");
      state = { ...state, curList: payload };
      break;
    }
    case "TOGGLE_PLAY_BOX": {
      if (state.showPlaybox) {
        document.querySelector("body").style.overflow = "auto";
      } else {
        document.querySelector("body").style.overflow = "hidden";
      }
      state = { ...state, showPlaybox: !state.showPlaybox };
      break;
    }
    case "FETCHING_LRC": {
      state = { ...state, lyric: action.payload };
      break;
    }
    case "RECIEVE_LRC": {
      let payload = action.payload;

      state = { ...state, lyric: action.payload };
      break;
    }
    case "FETCH_LRC_ERROR": {
      state = { ...state, lyric: action.payload };
      break;
    }
  }
  return state;
}

export function searchlistReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCHING_SEARCHLIST": {
      state = { ...state, fetching: true };
      break;
    }
    case "RECIEVE_SEARCHLIST": {
      state = {
        ...state,
        fetching: false,
        fetched: true,
        songs: action.songs,
        songCount: action.songCount,
        offset: action.offset
      };
      break;
    }
    case "FETCH_SEARCHLIST_FAILED": {
      state = { ...state, fetching: false, fetched: false, err: action.err };
      break;
    }
  }
  return state;
}

export function artistReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCHING_ARTIST_ALBUMS": {
      state = { ...state, fetching: true };
      break;
    }
    case "RECIEVE_ARTIST_ALBUMS": {
      state = {
        ...state,
        fetching: false,
        fetched: true,
        data: action.data
      };
      break;
    }
    case "FETCH_ARTIST_ALBUMS_FAILED": {
      state = { ...state, fetching: false, fetched: false, err: action.err };
      break;
    }
  }
  return state;
}
