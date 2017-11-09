export default function reducer(
  state = {
    user: [],
    sum: 0,
    fetching: false,
    fetched: false,
    error: null
  },
  action
) {
  switch (action.type) {
    case "FETCH_USERS_PENDING": {
      state = { ...state, fetching: true };
      break;
    }
    case "RECIEVE_USERS": {
      state = { ...state, fetched: true, fetching: false, user: action.value };
      break;
    }
    case "FETCH_USER_ERROR": {
      state = { ...state, fetched: false, fetching: false, error: action.err };
      break;
    }
    case "DISPATCH_SUM": {
      state = { ...state, sum: action.sum };
      break;
    }
  }

  return state;
}
