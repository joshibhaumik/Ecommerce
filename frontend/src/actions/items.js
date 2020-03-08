import axios from "axios";

import { GET_ITEMS } from "./types";

// get items
export const getitems = () => dispatch => {
  axios
    .get("/api/items")
    .then(r => {
      dispatch({
        type: GET_ITEMS,
        content: r.data
      });
    })
    .catch(e => console.log(e));
};
