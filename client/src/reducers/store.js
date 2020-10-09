import {
  STORE_IS_LOADING,
  STORE_ERROR,
  STORE_IS_LOADED,
  STORE_DELETED
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
    default:
      return {
        ...state
      };
  }
}
