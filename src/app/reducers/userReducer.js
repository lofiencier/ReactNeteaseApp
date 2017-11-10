import initialState from "../initialState";

export default function reducer(state = initialState, action) {
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
