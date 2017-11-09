import { combineReducers } from "redux";
import curShowListReducer from "./curShowListReducer";
export default combineReducers({
  curShowList: curShowListReducer
});
//干，原来这名字还要一模一样？
