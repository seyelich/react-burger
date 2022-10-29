import { getCookie } from "../../utils/utils";
import { getToken } from "../actions/auth";

export const socketMiddleware = (wsUrl, wsActions, isAuth) => {
    return store => {
        let socket = null;

        return next => action => {
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