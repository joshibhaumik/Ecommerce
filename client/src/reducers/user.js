import {
  USER_ISLOADED,
  USER_ISLOADING,
  USER_ERROR,
  USER_LOGOUT,
  USER_DELETED
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
        ...state
      };
    case USER_DELETED:
      return {
        ...state,
        isLoading: false,
        user: {},
        isAuthenticated: false
      };
    default:
      return state;
  }
}
