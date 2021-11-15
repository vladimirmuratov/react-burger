import {
    WS_CONNECTION_CLOSE,
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_GET_ORDERS
} from "../ws/wsActionTypes";

export type TOrder = {
    _id: string;
    name: string;
    number: number;
    createdAt: string;
    ingredients: Array<string>;
    status: string | any;
    updatedAt: string;
    openFeedModal?: () => void;
};

export type TOrders = {
    orders: Array<TOrder>;
    total: number;
    totalToday: number;
};



export interface IWSConnectionStartAction {
    readonly type: typeof WS_CONNECTION_START;
    readonly payload: string;
}

export interface IWSConnectionCloseAction {
    readonly type: typeof WS_CONNECTION_CLOSE;
}

export interface IWSConnectionSuccessAction {
    readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWSConnectionErrorAction {
    readonly type: typeof WS_CONNECTION_ERROR;
}

export interface IWSConnectionClosedAction {
    readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWSGetOrdersAction {
    readonly type: typeof WS_GET_ORDERS;
    readonly payload: TOrders;
}

export type TFeedActions =
    | IWSConnectionStartAction
    | IWSConnectionCloseAction
    | IWSConnectionSuccessAction
    | IWSConnectionErrorAction
    | IWSConnectionClosedAction
    | IWSGetOrdersAction;