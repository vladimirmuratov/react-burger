import {
    getUserProfileRequest,
    loginUserRequest,
    logoutRequest,
    refreshTokenRequest,
    registerUserRequest,
    resetPasswordRequest,
    saveResetPasswordRequest,
    updateUserProfileRequest
} from "../../api/api";
import {setCookie} from "../utils";
import {
    IClearMessageAction,
    IClearSuccessUpdateFlagAction,
    IClearUserDataAction,
    IForgotFormFullAction, TLoginForm,
    TForm, TResetForm
} from "./types";
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
    REGISTER_SUCCESS, RESET_PASSWORD_FAILED,
    RESET_PASSWORD_START,
    RESET_PASSWORD_SUCCESS, SAVE_RESET_PASSWORD_FAILED, SAVE_RESET_PASSWORD_START, SAVE_RESET_PASSWORD_SUCCESS,
    UPDATE_PROFILE_FAILED,
    UPDATE_PROFILE_START,
    UPDATE_PROFILE_SUCCESS
} from "./constants";
import {AppDispatch, AppThunk} from "../store";

export const postRegisterData: AppThunk = (data: TForm) => async (dispatch: AppDispatch) => {
    let res

    dispatch({
        type: REGISTER_START
    })

    try {
        res = await registerUserRequest(data)
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res
        })
    } catch (e: any) {
        dispatch({
            type: REGISTER_FAILED,
            payload: e.message
        })
    }
}

export const postLoginData: AppThunk = (data: TLoginForm) => async (dispatch: AppDispatch) => {
    let res

    dispatch({
        type: LOGIN_START
    })

    try {
        res = await loginUserRequest(data)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res
        })

    } catch (e: any) {
        dispatch({
            type: LOGIN_FAILED,
            payload: e.message
        })
    }
}

export const getProfileData: AppThunk = () => (dispatch: AppDispatch) => {

    dispatch({
        type: GET_PROFILE_START
    })

    getUserProfileRequest()
        .then(res => {
            if (!res.success) throw res;
            dispatch({
                type: GET_PROFILE_SUCCESS,
                payload: res.user
            })
        })
        .catch(res => {
            if (res.message === 'jwt expired') {
                // @ts-ignore
                dispatch(refreshToken(getProfileData()))
            }
        })
}

const refreshToken: AppThunk = (afterRefresh: any) => (dispatch: AppDispatch) => {
    refreshTokenRequest()
        .then(res => {
            localStorage.setItem('refreshToken', res.refreshToken)
            setCookie('accessToken', res.accessToken)
            dispatch(afterRefresh)
        })
}

export const updateProfileData: AppThunk = (data: TForm) => (dispatch: AppDispatch) => {

    dispatch({
        type: UPDATE_PROFILE_START
    })

    try {
        updateUserProfileRequest(data)
            .then(res => {
                if (!res.success) throw res
                dispatch({
                    type: UPDATE_PROFILE_SUCCESS,
                    payload: res.user
                })
            })
            .catch(res => {
                if (res.message === 'jwt expired') {
                    // @ts-ignore
                    dispatch(refreshToken(updateProfileData(data)))
                }
            })

    } catch (e: any) {
        dispatch({
            type: UPDATE_PROFILE_FAILED,
            payload: e.message
        })
    }
}

export const logout: AppThunk = () => (dispatch: AppDispatch) => {

    dispatch({
        type: LOGOUT_START
    })

    try {
        logoutRequest()
            .then(res => {
                if (!res.success) throw res
                dispatch({
                    type: LOGOUT_SUCCESS,
                    payload: res.message
                })
            })
            .catch(res => {
                if (res.message === 'jwt expired') {
                    // @ts-ignore
                    dispatch(refreshToken(logout()))
                }
            })
    } catch (e: any) {
        dispatch({
            type: LOGOUT_FAILED,
            payload: e.message
        })
    }
}

export const clearUserData = (): IClearUserDataAction => ({
    type: CLEAR_USER_DATA
})

export const clearSuccessUpdateFlag = (): IClearSuccessUpdateFlagAction => ({
    type: CLEAR_SUCCESS_FLAG
})

export const resetPassword: AppThunk = (data: string) => async (dispatch: AppDispatch) => {
    let res

    dispatch({
        type: RESET_PASSWORD_START
    })

    try {
        res = await resetPasswordRequest(data)
        dispatch({
            type: RESET_PASSWORD_SUCCESS,
            payload: res.message
        })

    } catch (e: any) {
        dispatch({
            type: RESET_PASSWORD_FAILED,
            payload: e.message
        })
    }
}

export const saveResetPassword: AppThunk = (data: TResetForm) => async (dispatch: AppDispatch) => {
    let res

    dispatch({
        type: SAVE_RESET_PASSWORD_START
    })

    try {
        res = await saveResetPasswordRequest(data)
        dispatch({
            type: SAVE_RESET_PASSWORD_SUCCESS,
            payload: res.message
        })

    } catch (e: any) {
        dispatch({
            type: SAVE_RESET_PASSWORD_FAILED,
            payload: e.message
        })
    }
}

export const clearMessage = (): IClearMessageAction => ({
    type: CLEAR_MESSAGE
})

export const forgotFormFull = (): IForgotFormFullAction => ({
    type: CHANGE_FORGOT_FORM
})
