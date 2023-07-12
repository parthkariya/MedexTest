import {
    GET_LOGIN_BEGIN,
    GET_LOGIN_SUCCESS,
    GET_LOGIN_ERROR,
    LOGOUT_USER,
    GET_USER_DETAILS,
    WALLET_BEGIN,
    WALLET_SUCCESS,
    WALLET_ERROR,

} from "../action";

const user_reducer = (state, action) => {
    //all home data
    if (action.type === GET_LOGIN_BEGIN) {
        return { ...state, login_loading: true };
    }
    if (action.type === GET_LOGIN_SUCCESS) {
        const userid = action.payload.user.id;
        const logintoken = action.payload.token;
        return {
            ...state,
            login_loading: false,
            logindata: action.payload.user,
            isLogin: true,
            userid: userid,
            logintoken: logintoken
        };
    }
    if (action.type === GET_USER_DETAILS) {
        return {
            ...state,
            login_loading: false,
            logindata: action.payload,
            isLogin: true,
        };
    }
    if (action.type === GET_LOGIN_ERROR) {
        return { ...state, login_loading: false, login_error: true, };
    }
    if (action.type === LOGOUT_USER) {
        return { ...state, isLogin: false, userid: "", logindata: {}, logintoken: '' };
    }

    if (action.type === WALLET_BEGIN) {
        return { ...state, wallet_loading: true }
    }

    if (action.type === WALLET_SUCCESS) {
        return { ...state, wallet_loading: false, wallet_data: action.payload }
    }

    if (action.type === WALLET_ERROR) {
        return { ...state, wallet_loading: false }
    }

    return state;
    throw new Error(`No Matching "${action.type}" - action type`);
};

export default user_reducer;
