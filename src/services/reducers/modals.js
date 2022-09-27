import { GET_ORDER, GET_ORDER_FAILED, GET_ORDER_SUCCESS, ADD_ITEM_INFO, DELETE_ITEM_INFO } from '../actions/modals';

const initialState = {
    order: {},
    orderRequest: false,
    orderFailed: false,

    currItem: {}
}

export const orderModalReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDER: {
            return { ...state, orderRequest: true}
        }
            
        case GET_ORDER_SUCCESS: {
            return { ...state, orderFailed: false, order: action.order, orderRequest: false };
        }

        case GET_ORDER_FAILED: {
            return { ...state, orderFailed: true, orderRequest: false };
        }

        default: {
            return state;
        }   
    }
}

export const itemInfoModalReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ITEM_INFO: {
            return {
                ...state,
                currItem: action.payload
            }
        }

        case DELETE_ITEM_INFO: {
            return {
                ...state, 
                currItem: {}
            }
        }
    
        default: {
            return state;
        }
    }
}