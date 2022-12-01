import { loginUser, registerUser, getUser, logoutUser, updateUserInfo, getTokenRequest } from '../../utils/burger-api';
import { deleteCookie, setCookie } from '../../utils/utils';
import { forgotPwUser, resetPwUser } from '../../utils/burger-api';
import { 
    REGISTER, REGISTER_SUCCESS, REGISTER_FAILED,
    LOGIN, LOGIN_SUCCESS, LOGIN_FAILED,
    LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAILED,
    GET_USER, GET_USER_FAILED, GET_USER_SUCCESS,
    FORGOT_PW, FORGOT_PW_FAILED, FORGOT_PW_SUCCESS,
    RESET_PW, RESET_PW_FAILED, RESET_PW_SUCCESS,
    UPDATE_USER, UPDATE_USER_FAILED, UPDATE_USER_SUCCESS,
    REFRESH_TOKEN, REFRESH_TOKEN_FAILED, REFRESH_TOKEN_SUCCESS
} from '../constants/auth';
import { AppDispatch, AppThunk } from '../types';
import { TUser } from '../../types';
import { cookieLiveTime } from '../../utils/constants';

export interface IRegisterAction {
    readonly type: typeof REGISTER
}

export interface IRegisterSuccessAction {
    readonly type: typeof REGISTER_SUCCESS,
    readonly payload: TUser,
}

export interface IRegisterFailedAction {
    readonly type: typeof REGISTER_FAILED,
}

export interface ILoginAction {
    readonly type: typeof LOGIN,
}

export interface ILoginSuccessAction {
    readonly type: typeof LOGIN_SUCCESS,
    readonly payload: TUser
}

export interface ILoginFailedAction {
    readonly type: typeof LOGIN_FAILED,
}

export interface ILogoutAction {
    readonly type: typeof LOGOUT,
}

export interface ILogoutSuccessAction {
    readonly type: typeof LOGOUT_SUCCESS
}

export interface ILogoutFailedAction {
    readonly type: typeof LOGOUT_FAILED,
}

export interface IGetUserAction {
    readonly type: typeof GET_USER,
}

export interface IGetUserSuccessAction {
    readonly type: typeof GET_USER_SUCCESS,
    readonly payload: TUser
}

export interface IGetUserFailedAction {
    readonly type: typeof GET_USER_FAILED,
}

export interface IForgotPwAction {
    readonly type: typeof FORGOT_PW,
}

export interface IForgotPwSuccessAction {
    readonly type: typeof FORGOT_PW_SUCCESS,
    readonly payload: string
}

export interface IForgotPwFailedAction {
    readonly type: typeof FORGOT_PW_FAILED,
}

export interface IResetPwAction {
    readonly type: typeof RESET_PW,
}

export interface IResetPwSuccessAction {
    readonly type: typeof RESET_PW_SUCCESS,
}

export interface IResetPwFailedAction {
    readonly type: typeof RESET_PW_FAILED,
}

export interface IUpdateUserAction {
    readonly type: typeof UPDATE_USER,
}

export interface IUpdateUserSuccessAction {
    readonly type: typeof UPDATE_USER_SUCCESS,
    readonly payload: TUser
}

export interface IUpdateUserFailedAction {
    readonly type: typeof UPDATE_USER_FAILED,
}

export interface IRefreshTokenAction {
    readonly type: typeof REFRESH_TOKEN,
}

export interface IRefreshTokenSuccessAction {
    readonly type: typeof REFRESH_TOKEN_SUCCESS,
}

export interface IRefreshTokenFailedAction {
    readonly type: typeof REFRESH_TOKEN_FAILED,
}

export type TAuthActions = 
    | IRegisterAction | IRegisterSuccessAction | IRegisterFailedAction
    | ILoginAction | ILoginSuccessAction | ILoginFailedAction
    | ILogoutAction | ILogoutSuccessAction | ILogoutFailedAction
    | IGetUserAction | IGetUserSuccessAction | IGetUserFailedAction
    | IForgotPwAction | IForgotPwSuccessAction | IForgotPwFailedAction
    | IResetPwAction | IResetPwSuccessAction | IResetPwFailedAction
    | IRefreshTokenAction | IRefreshTokenSuccessAction | IRefreshTokenFailedAction
    | IUpdateUserAction | IUpdateUserSuccessAction | IUpdateUserFailedAction

function registerFailed(): IRegisterFailedAction {
    return { type: REGISTER_FAILED }
}

function loginFailed(): ILoginFailedAction {
    return { type: LOGIN_FAILED }
}

function logoutFailed(): ILogoutFailedAction {
    return { type: LOGOUT_FAILED }
}

function getUserFailed(): IGetUserFailedAction {
    return { type: GET_USER_FAILED }
}

function forgotPwFailed(): IForgotPwFailedAction {
    return { type: FORGOT_PW_FAILED };
}

function resetPwFailed(): IResetPwFailedAction {
    return { type: RESET_PW_FAILED };
}

function updateUserFailed(): IUpdateUserFailedAction {
    return { type: UPDATE_USER_FAILED };
}

function getTokenFailed(): IRefreshTokenFailedAction {
    return { type: REFRESH_TOKEN_FAILED };
}

export const register: AppThunk = (form: TUser) => (dispatch: AppDispatch) => {
    dispatch({type: REGISTER});

    registerUser(form).then(res => {
        if (res && res.success) {
            setCookie('accessToken', res.accessToken, { expires: cookieLiveTime });
            setCookie('refreshToken', res.refreshToken);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.user
            });
        } else {
            dispatch(registerFailed())
        }
    })
    .catch(err => {
        console.log(err);
        dispatch(registerFailed())
    })
}

export const login: AppThunk = (form: TUser) => (dispatch: AppDispatch) => {
    dispatch({type: LOGIN});

    loginUser(form).then(res => {
        if (res && res.success) {
            setCookie('accessToken', res.accessToken, { expires: cookieLiveTime });
            setCookie('refreshToken', res.refreshToken);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.user
            })
        } else {
            dispatch(loginFailed())
        }
    })
    .catch(err => {
        console.log(err);
        dispatch(loginFailed())
    })
}

export const logout: AppThunk = (cn: () => void) => (dispatch: AppDispatch) => {
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

export const getUserInfo: AppThunk = () => (dispatch: AppDispatch & AppThunk) => {
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
    })
    .catch(err => {
        console.log(err);
        if(err.message === 'jwt expired') {
            dispatch(getToken());
        }
        dispatch(getUserFailed())
    })
}

export const forgotPw: AppThunk = (email: string, cn: () => void) => (dispatch: AppDispatch) => {
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

export const resetPw: AppThunk = (form, cn: () => void) => (dispatch: AppDispatch) => {
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

export const updateUser: AppThunk = (form: TUser) => (dispatch: AppDispatch & AppThunk) => {
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
    })
    .catch(err => {
        console.log(err);
        if(err.message === 'jwt expired') {
            dispatch(getToken());
        }
        dispatch(updateUserFailed())
    })
}

export const  getToken: AppThunk = () => (dispatch: AppDispatch) => {
    dispatch({type: REFRESH_TOKEN});

    getTokenRequest().then(res => {
        if (res && res.success) {
            setCookie('accessToken', res.accessToken, { expires: cookieLiveTime });
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