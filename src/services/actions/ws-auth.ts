import { 
    WS_CONNECTION_START_AUTH, 
    WS_CONNECTION_SUCCESS_AUTH, 
    WS_CONNECTION_CLOSED_AUTH, 
    WS_CONNECTION_ERROR_AUTH ,
    WS_GET_ORDERS_AUTH,
    WS_SEND_MESSAGE_AUTH
} from "../constants/ws-auth";
import { IOrdersInfo } from "../types/data";

interface IWsConnectionStartAuthAction {
    readonly type: typeof WS_CONNECTION_START_AUTH
}

interface IWsConnectionSuccessAuthAction {
    readonly type: typeof WS_CONNECTION_SUCCESS_AUTH
}

interface IWsConnectionClosedAuthAction {
    readonly type: typeof WS_CONNECTION_CLOSED_AUTH
}

interface IWsConnectionErrorAuthAction {
    readonly type: typeof WS_CONNECTION_ERROR_AUTH,
    readonly payload: string,
}

interface IWsGetOrdersAuthAction {
    readonly type: typeof WS_GET_ORDERS_AUTH,
    readonly payload: IOrdersInfo
}

interface IWsSendMessageAuthAction {
    readonly type: typeof WS_SEND_MESSAGE_AUTH
}

export type TWsAuthActions = 
    | IWsConnectionStartAuthAction
    | IWsConnectionClosedAuthAction
    | IWsConnectionErrorAuthAction
    | IWsConnectionSuccessAuthAction
    | IWsGetOrdersAuthAction
    | IWsSendMessageAuthAction
