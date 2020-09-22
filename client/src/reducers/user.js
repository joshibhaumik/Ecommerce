import { USER_ISLOADED, USER_ISLOADING, USER_ERROR } from "../actions/types";

const initialState = {
    loading:false,
    user:{},
    error: ""
};

export default function(state = initialState, action) {
    switch(action.type) {
        case USER_ISLOADED:
            return {
                ...state,
                loading:false,
                user: action.payload
            }
        case USER_ISLOADING:
            return {
                ...state,
                loading:true
            }
        case USER_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}
