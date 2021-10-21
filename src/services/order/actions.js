import {postOrderRequest} from "../../api/api";

export const START_REQUEST = 'START_REQUEST';
export const FINISH_REQUEST = 'FINISH_REQUEST';

export const PUT_ORDER_IDS_INGREDIENTS = 'PUT_ORDER_IDS_INGREDIENTS';

export const CLEAR_ORDER = 'CLEAR_ORDER';

export const TOGGLE_ORDER_MODAL = 'TOGGLE_ORDER_MODAL';

export const postOrderData = (data) => async (dispatch) => {
    let response

    dispatch({
        type: PUT_ORDER_IDS_INGREDIENTS,
        payload: data
    })

    dispatch({type: START_REQUEST})

    try {
        response = await postOrderRequest(data)
        dispatch({
            type: FINISH_REQUEST,
            payload: response
        })
    } catch (e) {
        console.log('Что-то пошло не так...', e)
    }
}

export const clearOrder = () => ({
    type: CLEAR_ORDER
})

export const openModalOrder = (bool) => ({
    type: TOGGLE_ORDER_MODAL,
    payload: bool
})