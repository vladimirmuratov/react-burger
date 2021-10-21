import {CLEAR_ORDER, FINISH_REQUEST, PUT_ORDER_IDS_INGREDIENTS, START_REQUEST, TOGGLE_ORDER_MODAL} from "./actions";


const initialState = {
    order: {},
    orderNum: null,
    isModalOrderOpen: false
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
        case TOGGLE_ORDER_MODAL:
            return {
                ...state,
                isModalOrderOpen: action.payload
            }
        default:
            return state
    }
}