import {IToggleModal} from "./types";

export const TOGGLE_MODAL: 'TOGGLE_MODAL' = 'TOGGLE_MODAL'

export const toggleModal = (bool: boolean): IToggleModal => ({
    type: TOGGLE_MODAL,
    payload: bool
})

