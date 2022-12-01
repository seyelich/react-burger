import { 
    WS_CONNECTION_START, 
    WS_CONNECTION_SUCCESS, 
    WS_CONNECTION_CLOSED, 
    WS_CONNECTION_ERROR ,
    WS_GET_ORDERS,
    WS_SEND_MESSAGE
} from "../constants/ws";
import { IOrdersInfo } from "../types/data";

interface IWsConnectionStartAction {
    readonly type: typeof WS_CONNECTION_START
}

interface IWsConnectionSuccessAction {
    readonly type: typeof WS_CONNECTION_SUCCESS
}

interface IWsConnectionClosedAction {
    readonly type: typeof WS_CONNECTION_CLOSED
}

interface IWsConnectionErrorAction {
    readonly type: typeof WS_CONNECTION_ERROR,
    readonly payload: string,
}

interface IWsGetOrdersAction {
    readonly type: typeof WS_GET_ORDERS,
    readonly payload: IOrdersInfo
}

interface IWsSendMessageAction {
    readonly type: typeof WS_SEND_MESSAGE
}

export type TWsActions = 
    | IWsConnectionStartAction
    | IWsConnectionClosedAction
    | IWsConnectionErrorAction
    | IWsConnectionSuccessAction
    | IWsGetOrdersAction
    | IWsSendMessageAction
