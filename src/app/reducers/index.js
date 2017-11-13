import { combineReducers } from "redux";
import searchlistReducer from "./searchlistReducer";
import AudioReducer from "./AudioReducer";
import userReducer from "./userReducer";
import playlistReducer from "./playlistReducer";
export default combineReducers({
  searchlist: searchlistReducer,
  Audio: AudioReducer,
  user: userReducer,
  playlist: playlistReducer
});
//干，原来这名字还要一模一样？
