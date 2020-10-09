import {
  USER_ERROR,
  USER_ISLOADING,
  USER_ISLOADED,
  USER_LOGOUT,
  USER_DELETED
} from "./types";
import axios from "axios";

export const loadCurrentUser = () => async dispatch => {
  try {
    dispatch({ type: USER_ISLOADING });
    const user = await axios.get("/api/users/current_user");
    if (user.data.status) {
      dispatch({
        type: USER_ISLOADED,
        payload: user.data.payload
      });
    } else {
      dispatch({ type: USER_LOGOUT });
    }
  } catch (error) {
    dispatch({ type: USER_ERROR, payload: error });
    console.error(error);
  }
};

export const logoutUser = () => async dispatch => {
  try {
    dispatch({ type: USER_ISLOADING });
    const user_ = await axios.get("/auth/logout");
    dispatch({ type: USER_LOGOUT });
  } catch (error) {
    dispatch({ type: USER_ERROR, payload: error });
    console.error(error);
  }
};

export const deleteUser = userId => async dispatch => {
  try {
    dispatch({ type: USER_ISLOADING });
    const user = await axios.delete("/api/users/" + userId);
    dispatch({ type: USER_DELETED });
  } catch (error) {
    dispatch({ type: USER_ERROR, payload: error });
    console.error(error);
  }
};

export const fetchUser = userId => async dispatch => {
  try {
    dispatch({
      type: USER_ISLOADING
    });
    const response = await axios.get("/api/user/" + userId);
    dispatch({
      type: USER_ISLOADED,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: USER_ERROR,
      payload: error
    });
    console.error(error);
  }
};
