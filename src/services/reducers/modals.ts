import { GET_ORDER, GET_ORDER_FAILED, GET_ORDER_SUCCESS } from '../constants/modals';
import { TModalActions } from '../actions/modals';
import { TOrder } from '../../types';

type TModalState = {
    order: TOrder | null,
    orderRequest: boolean,
    orderFailed: boolean,
}

const initialState: TModalState = {
    order: null,
    orderRequest: false,
    orderFailed: false,
}

export const orderModalReducer = (state = initialState, action: TModalActions) => {
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
