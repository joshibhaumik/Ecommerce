import {
  USER_ISLOADED,
  USER_LOGOUT,
  USER_STORE_CREATED,
  EMPTY_CART
} from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_ISLOADED:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      };
    case USER_LOGOUT:
      return {
        ...state,
        user: {},
        isAuthenticated: false
      };
    case USER_STORE_CREATED:
      return {
        ...state,
        user: {
          ...state.user,
          store: action.payload
        }
      }
    case EMPTY_CART:
      return {
        ...state,
        user: {
          ...state.user,
          cart: []
        }
      }
    default:
      return state;
  }
}
