import {TFeedActions, TOrder} from "./types";
import {WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_SUCCESS, WS_GET_ORDERS} from "../ws/wsActionTypes";

export type TFeedState = {
    orders: Array<TOrder>;
    total: number;
    totalToday: number;
    wsConnected: boolean;
    wsError: boolean;
    currentOrder: TOrder;
}

export const initialState: TFeedState = {
    orders: [],
    total: 0,
    totalToday: 0,
    wsConnected: false,
    wsError: false,
    currentOrder: {} as TOrder,
}

export const feedReducer = (state = initialState, action: TFeedActions): TFeedState => {
    switch (action.type) {
        case WS_CONNECTION_SUCCESS:
            return {
                ...state,
                wsConnected: true,
                wsError: false
            }

        case WS_CONNECTION_ERROR:
            return {
                ...state,
                wsConnected: false,
                wsError: true
            }

        case WS_CONNECTION_CLOSED:
            return {
                ...state,
                wsConnected: false,
                wsError: false
            }

        case WS_GET_ORDERS:
            const {orders, total, totalToday} = action.payload;

            return {
                ...state,
                orders: orders,
                total: total,
                totalToday: totalToday
            }

        default:
            return state
    }
}