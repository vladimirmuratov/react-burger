import type {AnyAction, Middleware, MiddlewareAPI} from 'redux';
import {AppDispatch, RootState} from "../store";
import {WS_CONNECTION_START} from "../ws/wsActionTypes";
import {wsConnectionClosed, wsConnectionError, wsConnectionSuccess, wsGetOrders} from "../feed/actions";

export const socketMiddleware = (): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return next => (action: AnyAction) => {
            const {dispatch, getState} = store;
            const {type, payload} = action;

            if (type === WS_CONNECTION_START) {
                socket = new WebSocket(payload);
            }
            if (socket) {
                socket.onopen = () => dispatch(wsConnectionSuccess())
                socket.onerror = event => dispatch(wsConnectionError(event))
                socket.onmessage = event => dispatch(wsGetOrders(JSON.parse(event.data)))
                socket.onclose = () => dispatch(wsConnectionClosed())
            }

            next(action);
        };
    }) as Middleware;
};