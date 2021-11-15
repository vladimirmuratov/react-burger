import {postOrderRequest} from "../../api/api";
import {AppDispatch, AppThunk} from "../store";
import {CLEAR_ORDER, FINISH_REQUEST, PUT_ORDER_IDS_INGREDIENTS, START_REQUEST} from "./constants";
import {IClearOrderAction} from "./types";

export const postOrderData: AppThunk = (data: Array<string>) => async (dispatch: AppDispatch) => {
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

export const clearOrder = (): IClearOrderAction => ({
    type: CLEAR_ORDER
})
