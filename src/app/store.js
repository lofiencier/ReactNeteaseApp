import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import reducers from "./reducers";
import initialState from "./initialState";

const middleware = applyMiddleware(promise(), thunk, logger);
export default createStore(reducers, initialState, middleware);
