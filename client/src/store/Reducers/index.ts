import { combineReducers } from "redux";
import { FileReducer } from "./filesReducer";
import { RecentReducer } from "./recentReducer";

// define the object and call the action
const rootReducers = combineReducers({
  files: FileReducer,
  recent: RecentReducer,
});
// else return default root reducer
export default rootReducers;
