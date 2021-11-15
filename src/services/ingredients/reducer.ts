import {TItem} from "../../types";
import {TIngredientsActions} from "./types";
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

type TIngredientsState = {
    ingredients: Array<TItem>;
    ingredientsInConstructor: Array<TItem>;
    currentIngredient: TItem;
    isLoading: boolean;
}


const initialState: TIngredientsState = {
    ingredients: [],
    ingredientsInConstructor: [],
    currentIngredient: {} as TItem,
    isLoading: false,
}

export const ingredientReducer = (state = initialState, action: TIngredientsActions): TIngredientsState => {
    switch (action.type) {
        case START_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case END_LOADING:
            return <TIngredientsState>{
                ...state,
                ingredients: action.payload,
                isLoading: false
            }
        case ADD_CURRENT_INGREDIENT:
            return {
                ...state,
                currentIngredient: action.payload
            }
        case DELETE_CURRENT_INGREDIENT:
            return {
                ...state,
                currentIngredient: {} as TItem
            }
        case ADD_INGREDIENT_IN_CONSTRUCTOR:
            return {
                ...state,
                ingredientsInConstructor: action.payload.type === 'bun'
                    ? [...state.ingredientsInConstructor.filter(item => item.type !== 'bun'), action.payload]
                    : [...state.ingredientsInConstructor, action.payload]
            }
        case INCREMENT_COUNT:
            return {
                ...state,
                ingredientsInConstructor: [...state.ingredientsInConstructor.map(item => item._id === action.id
                    ? item.type === 'bun'
                        ? {
                            ...item,
                            count: 2
                        }
                        : {...item, count: 1, customId: Number((Math.random() * 100).toFixed(0))}
                    : item)]
            }
        case DELETE_INGREDIENT_IN_CONSTRUCTOR:
            return {
                ...state,
                ingredientsInConstructor: [...state.ingredientsInConstructor.filter(item => item.customId !== action.id)]
            }
        case UPDATE_MOVE_CARDS:
            return <TIngredientsState>{
                ...state,
                ingredientsInConstructor: action.payload
            }
        case CLEAR_CONSTRUCTOR:
            return {
                ...state,
                ingredientsInConstructor: []
            }
        default:
            return state
    }
}

