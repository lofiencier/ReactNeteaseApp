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
      state = { ...state, loged: action.loged, profile: action.profile };
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
    case "DEL_SONG": {
      let { curList } = state;
      const arr = curList.filter((item, index) => index !== action.index);
      if (arr.length === 0) {
        state.AudioDom.src = "";
        state.AudioDom.currentTime = 0;
        state.AudioDom.pause();
        state = { ...state, curList: arr, isFm: false, isPlaying: false };
      } else {
        state = { ...state, curList: arr, isFm: false, isPlaying: true };
      }
      break;
    }
    case "CHANGE_PLAY_POSITION": {
      // state.AudioDom.currentTime=action.position/100*state.AudioDom.
      state = { ...state, isPlaying: true };
      console.log(state.AudioDom.volume);
      state.AudioDom.currentTime = action.position;
      break;
    }
    case "CHANGE_VOL": {
      state = { ...state, volume: action.vol };
      state.AudioDom.volume = state.volume;
      break;
    }
    case "TOGGLE_PLAY_STATE": {
      state.isPlaying = !state.isPlaying;
      // state={...state,isPlaying:!s};
      state.isPlaying ? state.AudioDom.play() : state.AudioDom.pause();
      state = { ...state };
      break;
    }
    case "PLAY_SINGLE_SONG": {
      state = {
        ...state,
        fetching: false,
        fetched: true,
        curMusicUrl: action.url,
        isPlaying: true
      };
      if (state.AudioDom.src !== action.url) {
        state.AudioDom.src = action.url;
      }
      break;
    }
    case "UNSHIFT_LIST": {
      // state.curList.unshift(action.single);
      let { curList } = state;
      // curList.unshift(action.single);
      curList = [action.single, ...curList];
      var arr = uniqueArray(curList, "id");
      state = {
        ...state,
        curIndex: 0,
        isPlaying: true,
        curList: arr,
        isFm: false
      };
      break;
    }
    case "PUSH_LIST": {
      state.curList.push(action.single);
      var arr = uniqueArray(state.curList, "id");
      if (state.curList.length > 0 && state.curList.length < 2) {
        state = { ...state, curIndex: 0, isPlaying: true, curList: arr };
      } else {
        state = { ...state, curList: arr };
      }
      break;
    }

    case "SWITCH_MODE": {
      state = { ...state, isFm: action.isFm };
      console.warn("ISFM:", state.isFm);
      break;
    }
    case "TOGGLE_LIST": {
      state = { ...state, showList: action.showlist };
      break;
    }
    case "COPY_SONG_INFO_UNSHIFT": {
      state.curList.unshift(action.song);
      var arr = uniqueArray(state.curList, "id");
      state = {
        ...state,
        curIndex: 0,
        isPlaying: true,
        isFm: false,
        curList: arr
      };
      break;
    }
    case "COPY_ALL_SONGS": {
      state = {
        ...state,
        curList: action.songs,
        curIndex: 0,
        isPlaying: true,
        isFm: false
      };
      state.curList = uniqueArray(state.curList, "id");
      break;
    }
    case "EMPTY_LIST": {
      state = { ...state, curList: [], isPlaying: false };
      break;
    }
    case "CHANGE_INDEX": {
      // if (state.isFm && action.index > state.fmList.length - 1) {
      //   state = { ...state, curIndex: 0 };
      //   console.log("FM OVERID");
      //   break;
      // } else if (!state.isFm && action.index > state.curList.length - 1) {
      //   console.log("MUSIC OVERID");
      //   state = { ...state, curIndex: 0 };
      //   break;
      // } else {
      state = { ...state, curIndex: action.index, isPlaying: true };
      break;
      // }
    }
    case "RECEIVE_FM_SONG": {
      state = { ...state, fmList: action.songs, curIndex: 0, isPlaying: true };
      break;
    }
    case "PRELOAD_FM_SONG": {
      state = { ...state, fm_preload: action.songs };
      break;
    }
    case "IMPORT_FM_BUFFER": {
      state.fmList = state.fm_preload;
      state = { ...state };
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
