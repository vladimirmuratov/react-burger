import {
    CHANGE_FORGOT_FORM,
    CLEAR_MESSAGE,
    CLEAR_SUCCESS_FLAG,
    CLEAR_USER_DATA,
    GET_PROFILE_START,
    GET_PROFILE_SUCCESS,
    LOGIN_FAILED,
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGOUT_FAILED,
    LOGOUT_START,
    LOGOUT_SUCCESS,
    REGISTER_FAILED,
    REGISTER_START,
    REGISTER_SUCCESS,
    RESET_PASSWORD_FAILED,
    RESET_PASSWORD_START,
    RESET_PASSWORD_SUCCESS, SAVE_RESET_PASSWORD_FAILED,
    SAVE_RESET_PASSWORD_START,
    SAVE_RESET_PASSWORD_SUCCESS,
    UPDATE_PROFILE_FAILED,
    UPDATE_PROFILE_START,
    UPDATE_PROFILE_SUCCESS
} from "./constants";

export type TForm = { name: string; email: string; password: string; }

export type TLoginForm = { email: string; password: string; }

export type TResetForm = { token: string; password: string; }

export interface IClearUserDataAction {
    readonly type: typeof CLEAR_USER_DATA;
}

export interface IClearSuccessUpdateFlagAction {
    readonly type: typeof CLEAR_SUCCESS_FLAG;
}

export interface IClearMessageAction {
    readonly type: typeof CLEAR_MESSAGE;
}

export interface IForgotFormFullAction {
    readonly type: typeof CHANGE_FORGOT_FORM;
}

type TRegisterStartAction = {
    readonly type: typeof REGISTER_START;
}

type TRegisterSuccessAction = {
    readonly type: typeof REGISTER_SUCCESS;
    readonly payload: any;
}

type TRegisterFailedAction = {
    readonly type: typeof REGISTER_FAILED;
    readonly payload: any;
}

type TLoginTypeAction = {
    readonly type: typeof LOGIN_START;
}

type TLoginSuccessAction = {
    readonly type: typeof LOGIN_SUCCESS;
    readonly payload: any;
}

type TLoginFailedAction = {
    readonly type: typeof LOGIN_FAILED;
    readonly payload: any;
}

type TGetProfileStartAction = {
    readonly type: typeof GET_PROFILE_START;
}

type TGetProfileSuccessAction = {
    readonly type: typeof GET_PROFILE_SUCCESS;
    readonly payload: any;
}

type TUpdateProfileStartAction = {
    readonly type: typeof UPDATE_PROFILE_START;
}

type TUpdateProfileSuccessAction = {
    readonly type: typeof UPDATE_PROFILE_SUCCESS;
    readonly payload: any;
}

type TUpdateProfileFailedAction = {
    readonly type: typeof UPDATE_PROFILE_FAILED;
    readonly payload: any;
}

type TLogoutStartAction = {
    readonly type: typeof LOGOUT_START;
}

type TLogoutSuccessAction = {
    readonly type: typeof LOGOUT_SUCCESS;
}

type TLogoutFailedAction = {
    readonly type: typeof LOGOUT_FAILED;
    readonly payload: any;
}

type TResetPasswordStartAction = {
    readonly type: typeof RESET_PASSWORD_START;
}

type TResetPasswordSuccessAction = {
    readonly type: typeof RESET_PASSWORD_SUCCESS;
    readonly payload: string;
}

type TResetPasswordFailedAction = {
    readonly type: typeof RESET_PASSWORD_FAILED;
    readonly payload: string;
}

type TSaveResetPasswordStartAction = {
    readonly type: typeof SAVE_RESET_PASSWORD_START;
}

type TSaveResetPasswordSuccessAction = {
    readonly type: typeof SAVE_RESET_PASSWORD_SUCCESS;
    readonly payload: string;
}

type TSaveResetPasswordFailedAction = {
    readonly type: typeof SAVE_RESET_PASSWORD_FAILED;
    readonly payload: string;
}

export type TUserActions =
    | IClearUserDataAction
    | IClearSuccessUpdateFlagAction
    | IClearMessageAction
    | IForgotFormFullAction
    | TRegisterStartAction
    | TRegisterSuccessAction
    | TRegisterFailedAction
    | TLoginTypeAction
    | TLoginSuccessAction
    | TLoginFailedAction
    | TGetProfileStartAction
    | TGetProfileSuccessAction
    | TUpdateProfileStartAction
    | TUpdateProfileSuccessAction
    | TUpdateProfileFailedAction
    | TLogoutStartAction
    | TLogoutSuccessAction
    | TLogoutFailedAction
    | TResetPasswordStartAction
    | TResetPasswordSuccessAction
    | TResetPasswordFailedAction
    | TSaveResetPasswordStartAction
    | TSaveResetPasswordSuccessAction
    | TSaveResetPasswordFailedAction;