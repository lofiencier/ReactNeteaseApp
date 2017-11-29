import { combineReducers } from "redux";
import initialState from "./initialState";

export default combineReducers({
  searchlist: searchlistReducer,
  Playbox: PlayboxReducer,
  user: userReducer,
  playlist: playlistReducer,
  album: albumReducer,
  artist: artistReducer
});

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
        songs: action.songs
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
        curMusicUrl: action.url,
        curMusicId: action.id
      };
      state.AudioDom.src = state.curMusicUrl;
      state.AudioDom.addEventListener("canplay", function() {
        this.play();
      });
      break;
    }
    case "UNSHIFT_LIST": {
      state = {
        ...state,
        curMusicId: action.single.id,
        curMusicName: action.single.name,
        curMusicCover: action.single.al.picUrl,
        curMusicArtist: action.single.ar[0].name
      };
      state.curList.unshift(action.single);
    }
    case "SWITCH_MODE": {
      state = { ...state, isFm: action.isFm };
      break;
    }
    case "TOGGLE_LIST": {
      state = { ...state, showList: action.showlist };
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

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGGING": {
      state = { ...state };
      break;
    }
    case "LOGED": {
      state = {
        ...state,
        isLoged: true,
        userId: action.data.profile.userId,
        avatarImgURL: action.data.profile.avatarUrl,
        nickname: action.data.profile.nickname,
        signature: action.data.profile.signature,
        info: action.data
      };
      break;
    }
    case "LOG_REJECTED": {
      state = { ...state, isLoged: false, loginErr: action.err };
      break;
    }
    case "FETCHING_USER_COLLECTION": {
      state = { ...state };
      break;
    }
    case "RECIVED_USER_COLLECTION": {
      state = { ...state, collection: action.playlist };
    }
    case "FETCH_USER_COLLECTION_REJECTED": {
      state = { ...state, collection_err: action.err };
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
