import { USER_ERROR, USER_ISLOADING, USER_ISLOADED } from "./types";
import axios from "axios";

export const fetchUser = async userId => dispatch => {
    try {
        dispatch({
            type: USER_ISLOADING,
        });
        const response = await axios.get("http://localhost:5000/api/user/"+userId);
        dispatch({
            type: USER_ISLOADED,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: USER_ERROR,
            payload: error
        });
    }
}