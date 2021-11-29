import {ingredientReducer, initialState} from "./reducer";
import {END_LOADING, START_LOADING} from "./constants";
import {
    addCurrentIngredient,
    addIngredientInConstructor, clearConstructor,
    deleteCurrentIngredient,
    deleteIngredientInConstructor,
    incrementCount, updateConstructor
} from "./actions";

describe('Testing Ingredient reducer', () => {
    
    it('should return the initial state', () => {
        const state = ingredientReducer(undefined, {})
        expect(state).toEqual(initialState)
    })

    it('should handle START_LOADING', () => {
        const action = {type: START_LOADING}
        const state = ingredientReducer(initialState, action)
        const result = {
            ...initialState,
            isLoading: true
        }
        expect(state).toEqual(result)
    })

    it('should handle END_LOADING', () => {
        const action = {
            type: END_LOADING,
            payload: [
                {name: 'item 1'},
                {name: 'item 2'},
                {name: 'item 3'}
            ]
        }
        const state = ingredientReducer(initialState, action)
        const result = {
            ...initialState,
            ingredients: action.payload,
            isLoading: false
        }
        expect(state).toEqual(result)
    })

    it('should handle ADD_CURRENT_INGREDIENT', () => {
        const payload = {name: 'item 1'}
        const state = ingredientReducer(initialState, addCurrentIngredient(payload))
        const result = {
            ...initialState,
            currentIngredient: payload
        }
        expect(state).toEqual(result)
    })

    it('should handle DELETE_CURRENT_INGREDIENT', () => {
        const state = ingredientReducer(initialState, deleteCurrentIngredient())
        const result = {
            ...initialState,
            currentIngredient: {}
        }
        expect(state).toEqual(result)
    })

    it('should handle ADD_INGREDIENT_IN_CONSTRUCTOR', () => {
        const payload = {name: 'item 1'}
        const state = ingredientReducer(initialState, addIngredientInConstructor(payload))
        const result = {
            ...initialState,
            ingredientsInConstructor: [
                ...initialState.ingredientsInConstructor,
                payload
            ]
        }
        expect(state).toEqual(result)
    })

    it('should handle INCREMENT_COUNT', () => {
        const id = '123'
        const state = ingredientReducer(initialState, incrementCount(id))
        const result = {
            ...initialState,
            ingredientsInConstructor: [...initialState.ingredientsInConstructor.map(item => item._id === id
                ? item.type === 'bun'
                    ? {
                        ...item,
                        count: 2
                    }
                    : {...item, count: 1, customId: Number((Math.random() * 100).toFixed(0))}
                : item)]
        }
        expect(state).toEqual(result)
    })

    it('should handle DELETE_INGREDIENT_IN_CONSTRUCTOR', () => {
        const id = 123
        const state = ingredientReducer(initialState, deleteIngredientInConstructor(id))
        const result = {
            ...initialState,
            ingredientsInConstructor: [...state.ingredientsInConstructor.filter(item => item.customId !== id)]
        }
        expect(state).toEqual(result)
    })

    it('should handle UPDATE_MOVE_CARDS', () => {
        const payload = [
            {name: 'item 1'},
            {name: 'item 2'},
            {name: 'item 3'}
        ]
        const state = ingredientReducer(initialState, updateConstructor(payload))
        const result = {
            ...initialState,
            ingredientsInConstructor: payload
        }
        expect(state).toEqual(result)
    })

    it('should handle CLEAR_CONSTRUCTOR', () => {
        const state = ingredientReducer(initialState, clearConstructor())
        const result = {
            ...initialState,
            ingredientsInConstructor: []
        }
        expect(state).toEqual(result)
    })

})