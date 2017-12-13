import { combineReducers } from "redux";
import initialState from "./initialState";

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
    case "COOKIE_ALIVE": {
      state = { ...state, loged: true };
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
    case "PLAY_SINGLE_SONG": {
      state = {
        ...state,
        fetching: false,
        fetched: true,
        curMusicUrl: action.url
      };
      state.AudioDom.src = action.url;
      break;
    }
    case "UNSHIFT_LIST": {
      state.curList.unshift(action.single);
      break;
    }

    case "SWITCH_MODE": {
      state = { ...state, isFm: action.isFm };
      break;
    }
    case "TOGGLE_LIST": {
      state = { ...state, showList: action.showlist };
      break;
    }
    case "COPY_SONG_INFO_UNSHIFT": {
      state.curList.unshift(action.song);
      state = { ...state, curIndex: 0, isPlaying: true, isFm: false };
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
        songCount: action.songCount
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
