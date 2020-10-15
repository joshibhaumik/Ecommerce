import {
  USER_ISLOADED,
  USER_ISLOADING,
  USER_ERROR,
  USER_LOGOUT,
  USER_STORE_CREATED
} from "../actions/types";

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: {},
  error: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_ISLOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload
      };
    case USER_ISLOADING:
      return {
        ...state,
        isLoading: true
      };
    case USER_ERROR:
      return {
        ...state,
        isLoading: false,
        error: JSON.stringify(action.payload)
      };
    case USER_LOGOUT:
      return {
        ...state,
        isLoading: false,
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
    default:
      return state;
  }
}
