import initialState from "../initialState";

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "FETCHING_LIST": {
      state = { ...state, fetching: true };
      break;
    }
    case "RECIEVE_LIST": {
      state = {
        ...state,
        fetching: false,
        fetched: true,
        targetList: action.data
      };
      break;
    }
    case "FETCH_LIST_FAILED": {
      state = { ...state, fetching: false, fetched: false, err: action.err };
      break;
    }
  }
  return state;
}
