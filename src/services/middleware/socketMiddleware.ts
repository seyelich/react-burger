import { getCookie } from "../../utils/utils";
import { getToken } from "../actions/auth";
import { AppThunk, TWsActionsDefault } from "../types";
import { MiddlewareAPI, AnyAction } from "redux";
import { Dispatch } from "react";

export const socketMiddleware = (wsUrl: string, wsActions: TWsActionsDefault, isAuth: boolean) => {
    return (store: MiddlewareAPI<Dispatch<TWsActionsDefault> & AppThunk>) => {
        let socket: WebSocket | null = null;

        return (next: (act: AnyAction) => void) => (action: AnyAction) => {
            const { dispatch } = store;
            const { type, payload } = action;
            const { wsInit,
                wsSendMessage,
                onOpen,
                onClose,
                onError,
                onMessage
            } = wsActions;
        
            const token = getCookie('accessToken')?.replace('Bearer ', '');

            if (type === wsInit) {
                socket = !isAuth
                    ? new WebSocket(`${wsUrl}${payload}`)
                    : new WebSocket(`${wsUrl}?token=${token}`)
            }

            if (socket) {
                socket.onopen = event => {
                    dispatch({ type: onOpen, payload: event });
                };

                socket.onerror = event => {
                    dispatch({ type: onError, payload: event });
                };

                socket.onmessage = event => {
                    const { data } = event;
                    const { success, ...info } = JSON.parse(data);
                    if(info.message === 'Invalid or missing token' && !!getCookie('refreshToken')) {
                        dispatch(getToken());
                    }
                    dispatch({ type: onMessage, payload: info });
                };

                socket.onclose = event => {
                    dispatch({ type: onClose, payload: event });
                };

                if (type === wsSendMessage) {
                    const message = payload;
                    socket.send(JSON.stringify(message));
                }
            }

            next(action);
        };
    };
};