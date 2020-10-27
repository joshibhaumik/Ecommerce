import {
  USER_ISLOADED,
  USER_ISLOADING,
  USER_ERROR,
  USER_LOGOUT,
  USER_STORE_CREATED,
  ADD_ITEM_TO_CART,
  REMOVE_ITEM_FROM_CART,
  DELETE_NOTIFICATION,
  EMPTY_CART
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
    case ADD_ITEM_TO_CART:
      return {
        ...state,
        isLoading: false,
        user: {
          ...state.user,
          cart: [...state.user.cart, action.payload]
        }
      }
    case REMOVE_ITEM_FROM_CART:
      return {
        ...state,
        isLoading: false,
        user: {
          ...state.user,
          cart:state.user.cart.filter(e => e._id !== action.payload._id)
        }
      }
    case DELETE_NOTIFICATION:
      return {
        ...state,
        isLoading: false,
        user: {
          ...state.user,
          notifications: state.user.notifications.filter(e => e._id !== action.payload._id )
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
