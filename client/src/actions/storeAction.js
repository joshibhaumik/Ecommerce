import axios from "axios";
import {
  STORE_IS_LOADING,
  STORE_IS_LOADED,
  STORE_ERROR,
  STORE_DELETED
} from "./types";

export const getStore = () => async (dispatch, getState) => {
  try {
    dispatch({ type: STORE_IS_LOADING });
    const store = await axios.get("/store/" + getState().user.user._id);
    dispatch({
      type: STORE_IS_LOADED,
      payload: store.data
    });
  } catch (error) {
    dispatch({ type: STORE_ERROR, payload: error });
    console.error(error);
  }
};

export const deleteStore = () => async (dispatch, getState) => {
  try {
    dispatch({ type: STORE_IS_LOADING });
    await axios.delete("/api/store/" + getState().store.store._id);
    dispatch({ type: STORE_DELETED });
  } catch (error) {
    dispatch({ type: STORE_ERROR, payload: error });
    console.error(error);
  }
};

export const createStore = storeDetails => async dispatch => {
  try {
    dispatch({ type: STORE_IS_LOADING });
    const response = await axios.post("/api/store", storeDetails);
    dispatch({
      type: STORE_IS_LOADED,
      payload: response.data.payload
    });
  } catch (error) {
    dispatch({ type: STORE_ERROR, payload: error });
    console.error(error);
  }
};

export const updateStore = storeDetails => async dispatch => {
  try {
    dispatch({ type: STORE_IS_LOADING });
    const response = await axios.put("/api/store/" + storeDetails._id, storeDetails);
    dispatch({
      type: STORE_IS_LOADED,
      payload: response.data.payload
    });
  } catch (error) {
    dispatch({ type: STORE_ERROR, payload: error });
    console.error(error);
  }
};
