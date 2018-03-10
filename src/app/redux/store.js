import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
// import logger from "redux-logger"
import promise from "redux-promise-middleware";
import reducers from "./reducers";
import initialState from "./initialState";

const middleware = applyMiddleware(promise(), thunk);
var store = createStore(reducers, initialState, middleware);

export default store;
