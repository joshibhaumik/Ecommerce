import {
  ADD_ITEMS_TO_CACHE,
  ADD_ITEM_TO_CACHE,
  ADD_STORE_TO_CACHE,
  ADD_USER_TO_CACHE
} from "./types";

export const addUserToCache = user => dispatch => {
  dispatch({
    type: ADD_USER_TO_CACHE,
    payload: user
  });
};

export const addStoreToCache = store => dispatch => {
  dispatch({
    type: ADD_STORE_TO_CACHE,
    payload: store
  });
};

export const addItemToCache = item => dispatch => {
  dispatch({
    type: ADD_ITEM_TO_CACHE,
    payload: item
  });
};

export const addItemsToCache = items => dispatch => {
  dispatch({
    type: ADD_ITEMS_TO_CACHE,
    payload: items
  });
};
