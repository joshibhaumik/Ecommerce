import axios from "axios";
import {
  ITEM_ERROR,
  ITEM_IS_LOADED,
  ITEM_IS_LOADING,
  ITEM_DELETED
} from "./types";

export const getItem = itemId => async dispatch => {
  try {
    dispatch({ type: ITEM_IS_LOADING });
    const item = await axios.get("/api/items/" + itemId);
    dispatch({
      type: ITEM_IS_LOADED,
      payload: item.data
    });
  } catch (error) {
    dispatch({ type: ITEM_ERROR, payload: error });
    console.log(error);
  }
};

export const createItem = itemDetails => async dispatch => {
  try {
    dispatch({ type: ITEM_IS_LOADING });
    const response = await axios.post("/api/items/", itemDetails);
    dispatch({
      type: ITEM_IS_LOADED,
      payload: response.data.payload
    });
  } catch (error) {
    dispatch({ type: ITEM_ERROR, payload: error });
    console.log(error);
  }
};

export const updateItem = itemDetails => async dispatch => {
  try {
    dispatch({ type: ITEM_IS_LOADING });
    const item = await axios.put("/api/items/" + itemDetails._id, itemDetails);
    dispatch({
      type: ITEM_IS_LOADED,
      payload: item.data.payload
    });
  } catch (error) {
    dispatch({ type: ITEM_ERROR, payload: error });
    console.log(error);
  }
};

export const deleteItem = itemId => async dispatch => {
  try {
    dispatch({ type: ITEM_IS_LOADING });
    const item = await axios.get("/api/items/" + itemId);
    dispatch({ type: ITEM_DELETED });
  } catch (error) {
    dispatch({ type: ITEM_ERROR, payload: error });
    console.log(error);
  }
};
