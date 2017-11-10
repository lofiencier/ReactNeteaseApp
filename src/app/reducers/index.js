import { combineReducers } from "redux";
import curShowListReducer from "./curShowListReducer";
import AudioReducer from "./AudioReducer";
import userReducer from "./userReducer";
export default combineReducers({
  curShowList: curShowListReducer,
  Audio: AudioReducer,
  user: userReducer
});
//干，原来这名字还要一模一样？
