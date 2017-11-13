import initialState from "../initialState";

export default function reducer(state = initialState, action) {
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
