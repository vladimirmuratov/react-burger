import {TOGGLE_MODAL} from "./actions";

export interface IToggleModal {
    readonly type: typeof TOGGLE_MODAL;
    readonly payload: boolean;
}

export type TModalActions = IToggleModal;