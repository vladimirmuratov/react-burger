import {initialState, orderReducer} from "./reducer";
import {clearOrder} from "./actions";
import {FINISH_REQUEST, PUT_ORDER_IDS_INGREDIENTS, START_REQUEST} from "./constants";

describe('Testing Order reducer', () => {

    it('should return the initial state', () => {
        const state = orderReducer(undefined, {})
        expect(state).toEqual(initialState)
    })

    it('should handle START_REQUEST', () => {
        const action = {type: START_REQUEST}
        const state = orderReducer(initialState, action)
        const result = {
            ...initialState,
        }
        expect(state).toEqual(result)
    })

    it('should handle FINISH_REQUEST', () => {
        const action = {
            type: FINISH_REQUEST,
            payload: {
                order: {
                    number: 123
                }
            }
        }
        const state = orderReducer(initialState, action)
        const result = {
            ...initialState,
            orderNum: action.payload.order.number
        }
        expect(state).toEqual(result)
    })

    it('should handle PUT_ORDER_IDS_INGREDIENTS', () => {
        const action = {
            type: PUT_ORDER_IDS_INGREDIENTS,
            payload: {
                order: ['123', '456']
            }
        }
        const state = orderReducer(initialState, action)
        const result = {
            ...initialState,
            order: action.payload
        }
        expect(state).toEqual(result)
    })

    it('should handle CLEAR_ORDER', () => {
        const state = orderReducer(initialState, clearOrder())
        const result = {
            ...initialState,
            order: [],
            orderNum: 0
        }
        expect(state).toEqual(result)
    })
})