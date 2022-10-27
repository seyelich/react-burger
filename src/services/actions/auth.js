import { loginUser, registerUser, getUser, logoutUser, updateUserInfo, getTokenRequest } from '../../utils/burger-api';
import { deleteCookie, getCookie, setCookie } from '../../utils/utils';
import { forgotPwUser, resetPwUser } from '../../utils/burger-api';

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';
export const REGISTER = 'REGISTER';

export const FORM_SET_VALUE = 'FORM_SET_VALUE';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGIN = 'LOGIN';

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';
export const LOGOUT = 'LOGOUT';

export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';
export const GET_USER = 'GET_USER';

export const FORGOT_PW_SUCCESS = 'FORGOT_PW_SUCCESS';
export const FORGOT_PW_FAILED = 'FORGOT_PW_FAILED';
export const FORGOT_PW = 'FORGOT_PW';

export const RESET_PW_SUCCESS = 'RESET_PW_SUCCESS';
export const RESET_PW_FAILED = 'RESET_PW_FAILED';
export const RESET_PW = 'RESET_PW';

export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED';
export const UPDATE_USER = 'UPDATE_USER'; 

export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_FAILED = 'REFRESH_TOKEN_FAILED';
export const REFRESH_TOKEN = 'REFRESH_TOKEN'; 

function registerFailed() {
    return { type: REGISTER_FAILED }
}

function loginFailed() {
    return { type: LOGIN_FAILED }
}

function logoutFailed() {
    return { type: LOGOUT_FAILED }
}

function getUserFailed() {
    return { type: GET_USER_FAILED }
}

function forgotPwFailed() {
    return { type: FORGOT_PW_FAILED };
}

function resetPwFailed() {
    return { type: RESET_PW_FAILED };
}

function updateUserFailed() {
    return { type: UPDATE_USER_FAILED };
}

function getTokenFailed() {
    return { type: REFRESH_TOKEN_FAILED };
}

export const register = (form, cn) => (dispatch) =>  {
    dispatch({type: REGISTER});

    registerUser(form).then(res => {
        if (res && res.success) {
            setCookie('accessToken', res.accessToken, { expires: 1200 });
            setCookie('refreshToken', res.refreshToken);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res
            })
            cn();
        } else {
            dispatch(registerFailed())
        }
    })
    .catch(err => {
        console.log(err);
        dispatch(registerFailed())
    })
}

export const login = (form, cn) => (dispatch) => {
    dispatch({type: LOGIN});

    loginUser(form).then(res => {
        if (res && res.success) {
            setCookie('accessToken', res.accessToken, { expires: 1200 });
            setCookie('refreshToken', res.refreshToken);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.user
            })
            cn();
        } else {
            dispatch(loginFailed())
        }
    })
    .catch(err => {
        console.log(err);
        dispatch(loginFailed())
    })
}

export const logout = (cn) => (dispatch) => {
    dispatch({type: LOGOUT});

    logoutUser().then(res => {
        if (res && res.success) {
            dispatch({
                type: LOGOUT_SUCCESS
            });
            cn();
            deleteCookie('accessToken');
            deleteCookie('refreshToken');
        } else {
            dispatch(logoutFailed())
        }
    })
    .catch(err => {
        console.log(err);
        dispatch(logoutFailed())
    })
}

export const getUserInfo = () => (dispatch) => {
    dispatch({type: GET_USER});

    getUser().then(res => {
        if (res && res.success) {
            dispatch({
                type: GET_USER_SUCCESS,
                payload: res.user
            })
        } else {
            dispatch(getUserFailed())
        }
        
        if(res.message === 'jwt expired' || (getCookie('refreshToken') && !getCookie('accessToken'))) {
            dispatch(getToken());
        }
    })
    .catch(err => {
        console.log(err);
        dispatch(getUserFailed())
    })
}

export function forgotPw(email, cn) {
    return function (dispatch) {
        dispatch({type: FORGOT_PW});

        forgotPwUser(email).then(res => {
            if (res && res.success) {
                dispatch({
                    type: FORGOT_PW_SUCCESS,
                    payload: email
                })
                cn();
            } else {
                dispatch(forgotPwFailed())
            }
        })
        .catch(err => {
            console.log(err);
            dispatch(forgotPwFailed())
        })
    }
}

export function resetPw(form, cn) {
    return function (dispatch) {
        dispatch({type: RESET_PW});

        resetPwUser(form).then(res => {
            if (res && res.success) {
                dispatch({
                    type: RESET_PW_SUCCESS
                })
                cn();
            } else {
                dispatch(resetPwFailed())
            }
        })
        .catch(err => {
            console.log(err);
            dispatch(resetPwFailed())
        })
    }
}

export function updateUser(form) {
    return function (dispatch) {
        dispatch({type: UPDATE_USER});

        updateUserInfo(form).then(res => {
            if (res && res.success) {
                dispatch({
                    type: UPDATE_USER_SUCCESS,
                    payload: res.user
                })
            } else {
                dispatch(updateUserFailed())
            }

            if(res.message === 'jwt expired' || (getCookie('refreshToken') && !getCookie('accessToken'))) {
                dispatch(getToken());
            }
        })
        .catch(err => {
            console.log(err);
            dispatch(updateUserFailed())
        })
    }
}

export function getToken() {
    return function (dispatch) {
        dispatch({type: REFRESH_TOKEN});

        getTokenRequest().then(res => {
            if (res && res.success) {
                setCookie('accessToken', res.accessToken, { expires: 1200 });
                setCookie('refreshToken', res.refreshToken);
                dispatch({
                    type: REFRESH_TOKEN_SUCCESS
                })
            } else {
                dispatch(getTokenFailed())
            }
        })
        .catch(err => {
            console.log(err);
            dispatch(getTokenFailed())
        })
    }
}