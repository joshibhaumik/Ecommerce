import {
  USER_ERROR,
  USER_ISLOADING,
  USER_ISLOADED,
  USER_LOGOUT,
  ADD_ITEM_TO_CART,
  REMOVE_ITEM_FROM_CART
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
    const res = await axios.post("/api/users/cart/"+item._id, {});
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