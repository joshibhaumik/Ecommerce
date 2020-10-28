import {
  USER_ISLOADED,
  USER_LOGOUT,
  IS_LOADING,
  IS_LOADED,
  EMPTY_CART
} from "./types";
import axios from "axios";

export const loadCurrentUser = () => async dispatch => {
  try {
    dispatch({ type: IS_LOADING });
    const user = await axios.get("/api/users/current_user");
    if (user.data.status) {
      dispatch({
        type: USER_ISLOADED,
        payload: user.data.payload
      });
    } else {
      dispatch({ type: USER_LOGOUT });
    }
    dispatch({type: IS_LOADED});
  } catch (error) {
    window.alert("An Array Encountered Please Try Again.");
    console.log(error);
  }
};

export const logoutUser = () => async dispatch => {
  try {
    dispatch({ type: IS_LOADING });
    await axios.get("/auth/logout");
    dispatch({ type: USER_LOGOUT });
    dispatch({type: IS_LOADED});
  } catch (error) {
    window.alert("An Array Encountered Please Try Again.");
    console.log(error);
  }
};

export const deleteUser = () => async (dispatch, getState) => {
  try {
    dispatch({ type: IS_LOADING });
    await axios.delete("/api/users/" + getState().user.user._id);
    dispatch({ type: USER_LOGOUT });
    dispatch({type: IS_LOADED});
  } catch (error) {
    window.alert("An Array Encountered Please Try Again.");
    console.log(error);
  }
};

export const addItemCart = item => async (dispatch, getState) => {
  try {
    dispatch({ type: IS_LOADING });
    const res = await axios.post(
      `/api/users/${getState().user.user._id}/cart/`,
      item
    );
    dispatch({
      type: USER_ISLOADED,
      payload: res.data.payload
    });
    dispatch({type: IS_LOADED});
  } catch (error) {
    window.alert("An Array Encountered Please Try Again.");
    console.log(error);
  }
};

export const removeItemCart = item => async (dispatch, getState) => {
  try {
    dispatch({ type: IS_LOADING });
    const res = await axios.delete(
      `/api/users/${getState().user.user._id}/cart/${item._id}`
    );
    dispatch({
      type: USER_ISLOADED,
      payload: res.data.payload
    });
    dispatch({type: IS_LOADED});
  } catch (error) {
    window.alert("An Array Encountered Please Try Again.");
    console.log(error);
  }
};

export const emptyTheCart = () => async (dispatch, getState) => {
  try {
    dispatch({ type: IS_LOADING });
    for (let item of getState().user.user.cart) {
      let res = await axios.delete(
        `/api/users/${getState().user.user._id}/cart/${item._id}`
      );
    }
    dispatch({ type: EMPTY_CART });
    dispatch({ type: IS_LOADED });
  } catch (error) {
    window.alert("An Array Encountered Please Try Again.");
    console.log(error);
  }
};

export const generateNotifications = notifications => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: IS_LOADING });
    for (let notification of notifications) {
      await axios.post(
        `/api/users/${getState().user.user._id}/notifications`,
        notification
      );
    }
    dispatch({ type: IS_LOADED });
  } catch (error) {
    window.alert("An Array Encountered Please Try Again.");
    console.log(error);
  }
};

export const deleteNotification = notification => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: IS_LOADING });
    const response = await axios.delete(
      `/api/users/${getState().user.user._id}/notifications/${notification._id}`
    );
    dispatch({
      type: USER_ISLOADED,
      payload: response.data.payload
    });
    dispatch({ type: IS_LOADED });
  } catch (error) {
    window.alert("An Array Encountered Please Try Again.");
    console.log(error);
  }
};
