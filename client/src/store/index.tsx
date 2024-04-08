import {
  applyMiddleware,
  compose,
  legacy_createStore as createStore,
} from "redux";

import reduxMiddleware from "../config/AxiosConfig";
import rootReducer from "./Reducers";

const middleware: any = [reduxMiddleware];
const { NODE_ENV } = import.meta.env;

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers =
  NODE_ENV !== "production" &&
  typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === "function"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const enhancers = composeEnhancers(applyMiddleware(...middleware));

const initialState = {};

const store = createStore(rootReducer, initialState, enhancers);

export default store;
