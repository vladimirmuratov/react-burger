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

export const REGISTER_START = 'REGISTER_START';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const GET_PROFILE_START = 'GET_PROFILE_START';
export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';

export const UPDATE_PROFILE_START = 'UPDATE_PROFILE_START';
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';
export const UPDATE_PROFILE_FAILED = 'UPDATE_PROFILE_FAILED';

export const LOGOUT_START = 'LOGOUT_START';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

export const RESET_PASSWORD_START = 'RESET_PASSWORD_START';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';

export const SAVE_RESET_PASSWORD_START = 'SAVE_RESET_PASSWORD_START';
export const SAVE_RESET_PASSWORD_SUCCESS = 'SAVE_RESET_PASSWORD_SUCCESS';
export const SAVE_RESET_PASSWORD_FAILED = 'SAVE_RESET_PASSWORD_FAILED';

export const CLEAR_USER_DATA = 'CLEAR_USER_DATA';

export const CLEAR_SUCCESS_FLAG = 'CLEAR_SUCCESS_FLAG';

export const CLEAR_MESSAGE = 'CLEAR_MESSAGE';

export const CHANGE_FORGOT_FORM = 'CHANGE_FORGOT_FORM';

export const postRegisterData = data => async dispatch => {
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
    } catch (e) {
        dispatch({
            type: REGISTER_FAILED,
            payload: e.message
        })
    }
}

export const postLoginData = data => async dispatch => {
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

    } catch (e) {
        dispatch({
            type: LOGIN_FAILED,
            payload: e.message
        })
    }
}

export const getProfileData = () => (dispatch) => {

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
                dispatch(refreshToken(getProfileData()))
            }
        })
}

const refreshToken = (afterRefresh) => (dispatch) => {
    refreshTokenRequest()
        .then(res => {
            localStorage.setItem('refreshToken', res.refreshToken)
            setCookie('accessToken', res.accessToken)
            dispatch(afterRefresh)
        })
}

export const updateProfileData = data => dispatch => {

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
                    dispatch(refreshToken(updateProfileData()))
                }
            })

    } catch (e) {
        dispatch({
            type: UPDATE_PROFILE_FAILED,
            payload: e.message
        })
    }
}

export const logout = () => (dispatch) => {

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
                    dispatch(refreshToken(logout()))
                }
            })
    } catch (e) {
        dispatch({
            type: LOGOUT_FAILED,
            payload: e.message
        })
    }
}

export const clearUserData = () => ({
    type: CLEAR_USER_DATA
})

export const clearSuccessUpdateFlag = () => ({
    type: CLEAR_SUCCESS_FLAG
})

export const resetPassword = (data) => async (dispatch) => {
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

    } catch (e) {
        dispatch({
            type: RESET_PASSWORD_FAILED,
            payload: e.message
        })
    }
}

export const saveResetPassword = data => async dispatch => {
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

    } catch (e) {
        dispatch({
            type: SAVE_RESET_PASSWORD_FAILED,
            payload: e.message
        })
    }
}

export const clearMessage = () => ({
    type: CLEAR_MESSAGE
})

export const forgotFormFull = () => ({
    type: CHANGE_FORGOT_FORM
})
