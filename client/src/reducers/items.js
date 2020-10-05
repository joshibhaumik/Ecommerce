import { ITEM_IS_LOADING, ITEM_IS_LOADED, ITEM_ERROR } from "../actions/types";

const init = {
  isLoading: false,
  item: {},
  error: ""
};

export default function(state = init, action) {
  switch (action.type) {
    case ITEM_IS_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case ITEM_IS_LOADED:
      return {
        ...state,
        isLoading: false,
        item: action.payload
      };
    case ITEM_ERROR:
      return {
        ...state,
        isLoading: false,
        error: JSON.stringify(action.payload)
      };
    default:
      return {
        ...state
      };
  }
}
