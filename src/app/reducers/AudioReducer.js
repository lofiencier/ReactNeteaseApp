import initialState from "../initialState";

export default function AudioReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_SONG": {
      state = { ...state, fetching: true };
    }
    case "RECIEVE_SONG_URL": {
      state = {
        ...state,
        fetching: false,
        fetched: true,
        targetURL: action.url
      };
      break;
    }
    case "FETCH_SONG_ERR": {
      state = { ...state, fetching: false, fetched: false, err: action.err };
      break;
    }
  }
  return state;
}
