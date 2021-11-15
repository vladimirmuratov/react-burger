import {TOrderActions} from "./types";
import {CLEAR_ORDER, FINISH_REQUEST, PUT_ORDER_IDS_INGREDIENTS, START_REQUEST} from "./constants";

type TOrderState = {
    order: {};
    orderNum: number;
}

const initialState: TOrderState = {
    order: {},
    orderNum: 0,
}

export const orderReducer = (state = initialState, action: TOrderActions): TOrderState => {
    switch (action.type) {
        case START_REQUEST:
            return {
                ...state,
            }
        case FINISH_REQUEST:
            return {
                ...state,
                orderNum: action.payload.order.number
            }
        case PUT_ORDER_IDS_INGREDIENTS:
            return {
                ...state,
                order: action.payload
            }
        case CLEAR_ORDER:
            return {
                ...state,
                order: {},
                orderNum: 0
            }
        default:
            return state
    }
}