import {IToggleModal} from "./types";
import {TOGGLE_MODAL} from "./actions";

type TModalState = {
    isOpenModal: boolean;
}

export const initialState: TModalState = {
    isOpenModal: false,
}

export const modalReducer = (state = initialState, action: IToggleModal): TModalState => {
    switch (action.type) {
        case TOGGLE_MODAL:
            return {
                ...state,
                isOpenModal: !state.isOpenModal
            }
        default:
            return state
    }
}