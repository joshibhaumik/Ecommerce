import axios from "axios";
import {
  STORE_IS_LOADING,
  STORE_IS_LOADED,
  STORE_ERROR,
  STORE_DELETED,
  USER_STORE_CREATED,
  ITEM_DELETED_FROM_STORE,
  ITEM_ADDED_TO_STORE,
  IS_LOADED,
  IS_LOADING
} from "./types";

export const getStore = () => async (dispatch, getState) => {
  try {
    dispatch({ type: STORE_IS_LOADING });
    const store = await axios.get("/api/store/" + getState().user.user.store);
    dispatch({
      type: STORE_IS_LOADED,
      payload: store.data.payload
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
    if (response.data.status) {
      dispatch({
        type: STORE_IS_LOADED,
        payload: response.data.payload
      });
      dispatch({
        type: USER_STORE_CREATED,
        payload: response.data.payload._id
      });
    }
  } catch (error) {
    dispatch({ type: STORE_ERROR, payload: error });
    console.error(error);
  }
};

export const updateStore = storeDetails => async dispatch => {
  try {
    dispatch({ type: STORE_IS_LOADING });
    const response = await axios.put(
      "/api/store/" + storeDetails._id,
      storeDetails
    );
    dispatch({
      type: STORE_IS_LOADED,
      payload: response.data.payload
    });
  } catch (error) {
    dispatch({ type: STORE_ERROR, payload: error });
    console.error(error);
  }
};

export const addItemToStore = itemDetails => async dispatch => {
  try {
    dispatch({ type: STORE_IS_LOADING });
    const response = await axios.post("/api/items/", itemDetails);
    if (response.data.status) {
      dispatch({
        type: ITEM_ADDED_TO_STORE,
        payload: response.data.payload
      });
    }
  } catch (error) {
    dispatch({ type: STORE_ERROR, payload: error });
    console.error(error);
  }
};

export const deleteItemToStore = itemDetails => async dispatch => {
  try {
    dispatch({ type: STORE_IS_LOADING });
    const response = await axios.delete("/api/items/"+itemDetails._id);
    if (response.data.status) {
      dispatch({
        type: ITEM_DELETED_FROM_STORE,
        payload: response.data.payload
      });
    }
  } catch (error) {
    dispatch({ type: STORE_ERROR, payload: error });
    console.error(error);
  }
};

export const updateStoreItem = details => async dispatch => {
  try {
    dispatch({ type: IS_LOADING });
    const res = await axios.put("/api/items/"+details._id, details);
    dispatch({ type: IS_LOADED });
  } catch (error) {
    console.log(error);
  }
}
