import { 
    LOGIN, 
    LOGIN_FAILED, 
    LOGIN_SUCCESS, 
    LOGOUT, 
    LOGOUT_FAILED, 
    LOGOUT_SUCCESS, 
    REGISTER, 
    REGISTER_FAILED, 
    REGISTER_SUCCESS, 
    GET_USER, 
    GET_USER_FAILED, 
    GET_USER_SUCCESS,
    FORGOT_PW, 
    FORGOT_PW_FAILED,
    FORGOT_PW_SUCCESS,
    RESET_PW,
    RESET_PW_FAILED,
    RESET_PW_SUCCESS,
    UPDATE_USER,
    UPDATE_USER_FAILED,
    UPDATE_USER_SUCCESS,
    REFRESH_TOKEN,
    REFRESH_TOKEN_SUCCESS,
    REFRESH_TOKEN_FAILED
} from "../actions/auth";

const initialState = {
    user: null,

    registerRequest: false,
    registerFailed: false,

    loginRequest: false,
    loginFailed: false,

    logoutRequest: false,
    logoutFailed: false,

    getUserRequest: false,
    getUserFailed: false,

    forgotPwRequest: false,
    forgotPwFailed: false,

    resetPwRequest: false,
    resetPwFailed: false,

    updateUserRequest: false,
    updateUserFailed: false, 

    refreshTokenRequest: false,
    refreshTokenFailed: false
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER: {
            return { ...state, registerRequest: true}
        }
        
        case REGISTER_SUCCESS: {
            return { ...state, user: action.payload, registerFailed: false, registerRequest: false }
        }

        case REGISTER_FAILED: {
            return { ...state, registerFailed: false, registerRequest: true }
        }

        case LOGIN: {
            return { ...state, loginRequest: true}
        }

        case LOGIN_SUCCESS: {
            return { ...state, user: action.payload, loginRequest: false, loginFailed: false}
        }

        case LOGIN_FAILED: {
            return { ...state, loginRequest: false, loginFailed: true}
        }

        case LOGOUT: {
            return { ...state, logoutRequest: true}
        }

        case LOGOUT_SUCCESS: {
            return { ...state, user: initialState.user, logoutRequest: false, logoutFailed: false}
        }

        case LOGOUT_FAILED: {
            return { ...state, logoutRequest: false, logoutFailed: true}
        }

        case GET_USER: {
            return { ...state, getUserRequest: true}
        }

        case GET_USER_SUCCESS: {
            return { 
                ...state, 
                user: { ...state.user, email: action.payload.email, name: action.payload.name, pw: ''},
                getUserRequest: false, 
                getUserFailed: false
            }
        }

        case GET_USER_FAILED: {
            return { ...state, getUserRequest: false, getUserFailed: true}
        }

        case FORGOT_PW: {
            return { ...state, forgotPwRequest: true }
        }
            
        case FORGOT_PW_SUCCESS: {
            return { ...state, user: {...state.user, email: action.payload}, forgotPwRequest: false, forgotPwFailed: false }
        }
            
    
        case FORGOT_PW_FAILED: {
            return { ...state, forgotPwRequest: false, forgotPwFailed: true }
        }

        case RESET_PW: {
            return { ...state, resetPwRequest: true }
        }
            
        case RESET_PW_SUCCESS: {
            return { ...state, resetPwRequest: false, resetPwFailed: false }
        }
    
        case RESET_PW_FAILED: {
            return { ...state, resetPwRequest: false, resetPwFailed: true }
        }

        case UPDATE_USER: {
            return { ...state, updateUserRequest: true }
        }
            
        case UPDATE_USER_SUCCESS: {
            return { ...state, user: action.payload, updateUserRequest: false, updateUserFailed: false }
        }
    
        case UPDATE_USER_FAILED: {
            return { ...state, updateUserRequest: false, updateUserFailed: true }
        }

        case REFRESH_TOKEN: {
            return { ...state, refreshTokenRequest: true }
        }
            
        case REFRESH_TOKEN_SUCCESS: {
            return { ...state, refreshTokenRequest: false, refreshTokenFailed: false }
        }
    
        case REFRESH_TOKEN_FAILED: {
            return { ...state, refreshTokenRequest: false, refreshTokenFailed: true }
        }
    
        default: {
            return state
        } 
    }
}