import {
  STORE_IS_LOADING,
  STORE_ERROR,
  STORE_IS_LOADED,
  STORE_DELETED,
  ITEM_ADDED_TO_STORE,
  ITEM_DELETED_FROM_STORE
} from "../actions/types";

const init = {
  isLoading: false,
  store: {},
  error: ""
};

export default function(state = init, action) {
  switch (action.type) {
    case STORE_IS_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case STORE_IS_LOADED:
      return {
        ...state,
        isLoading: false,
        store: action.payload
      };
    case STORE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: JSON.stringify(action.payload)
      };
    case STORE_DELETED:
      return {
        ...state,
        isLoading: false,
        store: {}
      };
    case ITEM_ADDED_TO_STORE:
      return {
        ...state,
        isLoading: false,
        store: {
          ...state.store,
          items: [...state.store.items, action.payload]
        }
      };
    case ITEM_DELETED_FROM_STORE:
      return {
        ...state,
        items: state.store.items.filter(
          e => String(e._id) !== String(action.payload._id)
        )
      };
    default:
      return {
        ...state
      };
  }
}
