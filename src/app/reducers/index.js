import { combineReducers } from "redux";
import curShowListReducer from "./curShowListReducer";
import AudioReducer from "./AudioReducer";
export default combineReducers({
  curShowList: curShowListReducer,
  Audio: AudioReducer
});
//干，原来这名字还要一模一样？
