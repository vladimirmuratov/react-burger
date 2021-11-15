import {CLEAR_ORDER, FINISH_REQUEST, PUT_ORDER_IDS_INGREDIENTS, START_REQUEST} from "./constants";

export interface IClearOrderAction {
    readonly type: typeof CLEAR_ORDER;
}

type TStartRequestAction = {
    readonly type: typeof START_REQUEST;
}

type TPutOrderIdsIngredientsAction = {
    readonly type: typeof PUT_ORDER_IDS_INGREDIENTS;
    readonly payload: Array<string>;
}

type TFinishRequestAction = {
    readonly type: typeof FINISH_REQUEST;
    readonly payload: {
        order: {
            number: number;
        }
    };
}


export type TOrderActions =
    | IClearOrderAction
    | TStartRequestAction
    | TPutOrderIdsIngredientsAction
    | TFinishRequestAction;