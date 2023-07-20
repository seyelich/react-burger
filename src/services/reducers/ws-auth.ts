import { TWsAuthActions } from '../actions/ws-auth';
import {
    WS_CONNECTION_SUCCESS_AUTH,
    WS_CONNECTION_ERROR_AUTH,
    WS_CONNECTION_CLOSED_AUTH,
    WS_GET_ORDERS_AUTH
} from '../constants/ws-auth';
import { IOrdersInfo } from '../types/data';
  
type TWsAuthState = {
    wsConnected: boolean,
    ordersInfo: IOrdersInfo | null,
    error: undefined | string
}

const initialState: TWsAuthState = {
    wsConnected: false,
    ordersInfo: null,
    error: undefined
};

export const wsReducerAuth = (state = initialState, action: TWsAuthActions) => {
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