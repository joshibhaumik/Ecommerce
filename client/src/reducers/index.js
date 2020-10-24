import { combineReducers } from "redux";
import user from "./user";
import store from "./store";
import error from "./error";

export default combineReducers({
  user: user,
  store: store,
  error: error
});
