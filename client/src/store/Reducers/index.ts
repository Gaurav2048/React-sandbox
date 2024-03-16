import { combineReducers } from "redux";
import { FileReducer } from "./filesReducer";

// define the object and call the action
const rootReducers = combineReducers({
  files: FileReducer
});
// else return default root reducer
export default rootReducers;