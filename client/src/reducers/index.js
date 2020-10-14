import { combineReducers } from "redux";
import user from "./user";
import store from "./store";
import cache from "./cache";
import error from "./error";

export default combineReducers({
  user: user,
  store: store,
  cache: cache,
  error: error
});
