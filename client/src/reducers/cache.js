import {} from "../actions/types";

const initialState = {
  users: {},
  stores: {},
  items: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    default:
      return {
        ...state
      };
  }
}
