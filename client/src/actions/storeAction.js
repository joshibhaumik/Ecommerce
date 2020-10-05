import axios from "axios";
import { STORE_IS_LOADING, STORE_IS_LOADED, STORE_ERROR } from "./types";

export const getStore = storeId => async dispatch => {
  try {
    dispatch({ type: STORE_IS_LOADING });
    const store = await axios.get("/store/" + storeId);
    dispatch({
      type: STORE_IS_LOADED,
      payload: store.data
    });
  } catch (error) {
    dispatch({ type: STORE_ERROR, payload: error });
    console.error(error);
  }
};
