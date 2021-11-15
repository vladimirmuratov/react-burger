import {
    ADD_CURRENT_INGREDIENT,
    ADD_INGREDIENT_IN_CONSTRUCTOR, CLEAR_CONSTRUCTOR,
    DELETE_CURRENT_INGREDIENT,
    DELETE_INGREDIENT_IN_CONSTRUCTOR, END_LOADING, INCREMENT_COUNT, START_LOADING, UPDATE_MOVE_CARDS
} from "./constants";
import {TItem} from "../../types";

export interface IAddCurrentIngredientAction {
    readonly type: typeof ADD_CURRENT_INGREDIENT;
    readonly payload: TItem;
}

export interface IDeleteCurrentIngredientAction {
    readonly type: typeof DELETE_CURRENT_INGREDIENT;
}

export interface IAddIngredientInConstructorAction {
    readonly type: typeof ADD_INGREDIENT_IN_CONSTRUCTOR;
    readonly payload: TItem;
}

export interface IDeleteIngredientInConstructorAction {
    readonly type: typeof DELETE_INGREDIENT_IN_CONSTRUCTOR;
    readonly id: number;
}

export interface IIncrementCountAction {
    readonly type: typeof INCREMENT_COUNT;
    readonly id: string | number;
}

export interface IUpdateConstructorAction {
    readonly type: typeof UPDATE_MOVE_CARDS;
    readonly payload: ReadonlyArray<TItem>;
}

export interface IClearConstructorAction {
    readonly type: typeof CLEAR_CONSTRUCTOR;
}

type TStartLoadingAction = {
    readonly type: typeof START_LOADING;
}

type TEndLoadingAction = {
    readonly type: typeof END_LOADING;
    readonly payload: ReadonlyArray<TItem>;
}

export type TIngredientsActions =
    | IAddCurrentIngredientAction
    | IDeleteCurrentIngredientAction
    | IAddIngredientInConstructorAction
    | IDeleteIngredientInConstructorAction
    | IIncrementCountAction
    | IUpdateConstructorAction
    | IClearConstructorAction
    | TStartLoadingAction
    | TEndLoadingAction;