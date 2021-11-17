import {getDataRequest} from "../../api/api";
import {TItem} from "../../types";
import {AppDispatch, AppThunk} from "../store";
import {
    ADD_CURRENT_INGREDIENT,
    ADD_INGREDIENT_IN_CONSTRUCTOR,
    CLEAR_CONSTRUCTOR,
    DELETE_CURRENT_INGREDIENT,
    DELETE_INGREDIENT_IN_CONSTRUCTOR,
    END_LOADING,
    INCREMENT_COUNT,
    START_LOADING,
    UPDATE_MOVE_CARDS
} from "./constants";
import {
    IAddCurrentIngredientAction,
    IAddIngredientInConstructorAction,
    IClearConstructorAction,
    IDeleteCurrentIngredientAction,
    IDeleteIngredientInConstructorAction,
    IIncrementCountAction,
    IUpdateConstructorAction
} from "./types";

export const fetchData: AppThunk = () => async (dispatch: AppDispatch) => {
    dispatch({
        type: START_LOADING
    })
    try {
        const res = await getDataRequest()
        dispatch({
            type: END_LOADING,
            payload: res.data
        })

    } catch (e) {
        console.log('Что-то пошло не так...', e)
    }
}

export const addCurrentIngredient = (item: TItem): IAddCurrentIngredientAction => ({
    type: ADD_CURRENT_INGREDIENT,
    payload: item
})

export const deleteCurrentIngredient = (): IDeleteCurrentIngredientAction => ({
    type: DELETE_CURRENT_INGREDIENT
})

export const addIngredientInConstructor = (item: TItem): IAddIngredientInConstructorAction => ({
    type: ADD_INGREDIENT_IN_CONSTRUCTOR,
    payload: item
})

export const deleteIngredientInConstructor = (id: number): IDeleteIngredientInConstructorAction => ({
    type: DELETE_INGREDIENT_IN_CONSTRUCTOR,
    id
})

export const incrementCount = (id: string | number): IIncrementCountAction => ({
    type: INCREMENT_COUNT,
    id
})

export const updateConstructor = (data: ReadonlyArray<TItem>): IUpdateConstructorAction => ({
    type: UPDATE_MOVE_CARDS,
    payload: data
})

export const clearConstructor = (): IClearConstructorAction => ({
    type: CLEAR_CONSTRUCTOR
})
