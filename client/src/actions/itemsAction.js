import axios from "axios";
import { ITEM_ERROR, ITEM_IS_LOADED, ITEM_IS_LOADING } from "./types";

export const getItem = itemId => async dispatch => {
  try {
    dispatch({ type: ITEM_IS_LOADING });
    const item = await axios.get("/items/" + itemId);
    dispatch({
      type: ITEM_IS_LOADED,
      payload: item.data
    });
  } catch (error) {
    dispatch({ type: ITEM_ERROR, payload: error });
    console.log(error);
  }
};
