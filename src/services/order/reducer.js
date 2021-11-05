import {CLEAR_ORDER, FINISH_REQUEST, PUT_ORDER_IDS_INGREDIENTS, START_REQUEST} from "./actions";


const initialState = {
    order: {},
    orderNum: null,
}

export const orderReducer = (state = initialState, action) => {
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
                orderNum: null
            }
        default:
            return state
    }
}