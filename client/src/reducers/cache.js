import {
  ADD_USER_TO_CACHE,
  ADD_ITEM_TO_CACHE,
  ADD_STORE_TO_CACHE
} from "../actions/types";

const initialState = {
  users: {},
  stores: {},
  items: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_USER_TO_CACHE:
      return {
        ...state,
        users: {
          ...state.user,
          [action.payload._id]: action.payload
        }
      };
    case ADD_STORE_TO_CACHE:
      return {
        ...state,
        stores: {
          ...state.stores,
          [action.payload._id]: action.payload
        }
      };
    case ADD_ITEM_TO_CACHE:
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload._id]: action.payload
        }
      };
    default:
      return {
        ...state
      };
  }
}
