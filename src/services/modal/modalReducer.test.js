import {initialState, modalReducer} from "./reducer";
import {toggleModal} from "./actions";


describe('Testing Modal reducer', () => {
    it('should return the initial state', () => {
        const state = modalReducer(undefined, {})
        expect(state).toEqual(initialState)
    })

    it('should handle TOGGLE_MODAL', () => {
        const isModalOpen = true
        const state = modalReducer(initialState, toggleModal(isModalOpen))
        const result = {
            ...initialState,
            isOpenModal: true
        }
        expect(state).toEqual(result)
    })
})