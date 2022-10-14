import { FORGOT_PW, FORGOT_PW_FAILED, FORGOT_PW_SUCCESS, RESET_PW, RESET_PW_FAILED, RESET_PW_SUCCESS, PASSWORD_FORM_SET_VALUE } from "../actions/password"

const initialState = { //maybe make one reducer for password and auth
    email: '',
    name: '',
    pw: '',
    
}

export const pwReducer = (state = initialState, action) => {
    switch (action.type) {
        case PASSWORD_FORM_SET_VALUE: {
            return { 
                ...state, 
                [action.field]: action.value
            }
        }
        
        default: {
            return state
        }

    }
}