import {getDataRequest} from "../../api/api";

export const START_LOADING = 'START_LOADING';
export const END_LOADING = 'END_LOADING';

export const ADD_CURRENT_INGREDIENT = 'ADD_CURRENT_INGREDIENT';
export const DELETE_CURRENT_INGREDIENT = 'DELETE_CURRENT_INGREDIENT';

export const ADD_INGREDIENT_IN_CONSTRUCTOR = 'ADD_INGREDIENT_IN_CONSTRUCTOR';
export const DELETE_INGREDIENT_IN_CONSTRUCTOR = 'DELETE_INGREDIENT_IN_CONSTRUCTOR';

export const INCREMENT_COUNT = 'INCREMENT_COUNT';

export const UPDATE_MOVE_CARDS = 'UPDATE_MOVE_CARDS';

export const CLEAR_CONSTRUCTOR = 'CLEAR_CONSTRUCTOR';

export const TOGGLE_INGREDIENT_MODAL = 'TOGGLE_INGREDIENT_MODAL';

export const fetchData = () => async (dispatch) => {
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

export const addCurrentIngredient = (item) => ({
    type: ADD_CURRENT_INGREDIENT,
    payload: item
})

export const deleteCurrentIngredient = () => ({
    type: DELETE_CURRENT_INGREDIENT
})

export const addIngredientInConstructor = (item) => ({
    type: ADD_INGREDIENT_IN_CONSTRUCTOR,
    payload: item
})

export const deleteIngredientInConstructor = (id) => ({
    type: DELETE_INGREDIENT_IN_CONSTRUCTOR,
    id
})

export const incrementCount = (id) => ({
    type: INCREMENT_COUNT,
    id
})

export const updateConstructor = (data) => ({
    type: UPDATE_MOVE_CARDS,
    payload: data
})

export const clearConstructor = () => ({
    type: CLEAR_CONSTRUCTOR
})

export const openModalIngredient = (bool) => ({
    type: TOGGLE_INGREDIENT_MODAL,
    payload: bool
})

