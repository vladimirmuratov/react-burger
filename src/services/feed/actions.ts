import {
    WS_CONNECTION_START,
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR, WS_CONNECTION_CLOSE, WS_GET_ORDERS
} from "../ws/wsActionTypes"

export const wsConnectionStart = (url: string) => ({
        type: WS_CONNECTION_START,
        payload: url
})

export const wsConnectionClose = () => ({
        type: WS_CONNECTION_CLOSE
})

export const wsConnectionSuccess = () => ({
        type: WS_CONNECTION_SUCCESS
})

export const wsConnectionError = (event: Event | undefined) => ({
        type: WS_CONNECTION_ERROR,
        payload: event
})

export const wsConnectionClosed = () => ({
        type: WS_CONNECTION_CLOSED
})

export const wsGetOrders = (orders: any) => ({
        type: WS_GET_ORDERS,
        payload: orders
})
