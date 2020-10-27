import { IS_LOADING, IS_LOADED } from "../actions/types";

const init = {
  isLoading: false
};

export default function(state = init, action) {
  switch (action.type) {
    case IS_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case IS_LOADED:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
}
