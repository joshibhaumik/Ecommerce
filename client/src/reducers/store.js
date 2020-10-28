import {
  STORE_IS_LOADED,
  STORE_DELETED,
  ITEM_ADDED_TO_STORE,
  ITEM_DELETED_FROM_STORE
} from "../actions/types";

const init = {
  store: {},
};

export default function(state = init, action) {
  switch (action.type) {
    case STORE_IS_LOADED:
      return {
        ...state,
        store: action.payload
      };
    case STORE_DELETED:
      return {
        ...state,
        store: {}
      };
    case ITEM_ADDED_TO_STORE:
      return {
        ...state,
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
