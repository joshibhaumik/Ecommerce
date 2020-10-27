import {
  USER_ERROR,
  USER_ISLOADING,
  USER_ISLOADED,
  USER_LOGOUT,
  ADD_ITEM_TO_CART,
  REMOVE_ITEM_FROM_CART,
  IS_LOADING,
  IS_LOADED,
  DELETE_NOTIFICATION,
  EMPTY_CART
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
    await axios.get("/auth/logout");
    dispatch({ type: USER_LOGOUT });
  } catch (error) {
    dispatch({ type: USER_ERROR, payload: error });
    console.error(error);
  }
};

export const deleteUser = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_ISLOADING });
    await axios.delete("/api/users/" + getState().user.user._id);
    dispatch({ type: USER_LOGOUT });
  } catch (error) {
    dispatch({ type: USER_ERROR, payload: error });
    console.error(error);
  }
};

export const addItemCart = item => async dispatch => {
  try {
    dispatch({ type: USER_ISLOADING });
    const res = await axios.post("/api/users/cart/"+item.item, item);
    dispatch({
      type: ADD_ITEM_TO_CART,
      payload: res.data.payload
    });
  } catch (error) {
    console.error(error);
  }
}

export const removeItemCart = item => async dispatch => {
  try {
    dispatch({ type: USER_ISLOADING });
    const res = await axios.delete("/api/users/cart/"+item._id);
    dispatch({
      type: REMOVE_ITEM_FROM_CART,
      payload: res.data.payload
    });
  } catch (error) {
    console.error(error);
  }
}

export const emptyTheCart = items => async dispatch => {
  try {
    dispatch({type: IS_LOADING});
    for(let item of items) {
      let res = await axios.delete("/api/users/cart/"+item._id);
    }
    dispatch({type: IS_LOADED});
    dispatch({ type: EMPTY_CART })
  } catch (error) {
    console.log(error);
  }
}

export const generateNotifications = items => async dispatch => {
  try {
    dispatch({ type: IS_LOADING });
    for(let item of items) {
      let res = await axios.post("/api/notifications/", item);
    }
    dispatch({ type: IS_LOADED});
  } catch (error) {
    console.log(error);
  }
}

export const deleteNotification = notification => async dispatch => {
  try {
    dispatch({ type: IS_LOADING });
    const res = await axios.delete("/api/notifications/"+notification._id);
    dispatch({
      type: DELETE_NOTIFICATION,
      payload: res.data.payload
    });
    dispatch({ type: IS_LOADED});
  } catch (error) {
    console.log(error);
  }
}