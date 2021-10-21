import {
    ADD_CURRENT_INGREDIENT,
    ADD_INGREDIENT_IN_CONSTRUCTOR,
    CLEAR_CONSTRUCTOR,
    DELETE_CURRENT_INGREDIENT,
    DELETE_INGREDIENT_IN_CONSTRUCTOR,
    END_LOADING,
    INCREMENT_COUNT,
    START_LOADING, TOGGLE_INGREDIENT_MODAL,
    UPDATE_MOVE_CARDS
} from "./actions";


const initialState = {
    ingredients: [],
    ingredientsInConstructor: [],
    currentIngredient: {},
    isLoading: false,
    isModalIngredientOpen: false
}

export const ingredientReducer = (state = initialState, action) => {
    switch (action.type) {
        case START_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case END_LOADING:
            return {
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
                currentIngredient: {}
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
            return {
                ...state,
                ingredientsInConstructor: action.payload
            }
        case CLEAR_CONSTRUCTOR:
            return {
                ...state,
                ingredientsInConstructor: []
            }
        case TOGGLE_INGREDIENT_MODAL:
            return {
                ...state,
                isModalIngredientOpen: action.payload
            }
        default:
            return state
    }
}

