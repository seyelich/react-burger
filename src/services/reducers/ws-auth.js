import {
    WS_CONNECTION_SUCCESS_AUTH,
    WS_CONNECTION_ERROR_AUTH,
    WS_CONNECTION_CLOSED_AUTH,
    WS_GET_ORDERS_AUTH
} from '../actions/ws-auth';
  
const initialState = {
    wsConnected: false,
    ordersInfo: null,
    error: undefined
};

export const wsReducerAuth = (state = initialState, action) => {
    switch (action.type) {
        case WS_CONNECTION_SUCCESS_AUTH:
            return {
                ...state,
                error: undefined,
                wsConnected: true
            };

        case WS_CONNECTION_ERROR_AUTH:
            return {
                ...state,
                error: action.payload,
                wsConnected: false
            };

        case WS_CONNECTION_CLOSED_AUTH:
            return {
                ...state,
                error: undefined,
                wsConnected: false
            };

        case WS_GET_ORDERS_AUTH:
            return {
                ...state,
                error: undefined,
                ordersInfo: {...action.payload, orders: action.payload.orders?.reverse()}
            };

        default:
            return state;
    }
};