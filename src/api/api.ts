import {getCookie} from "../services/utils";

const BASE_URL = 'https://norma.nomoreparties.space/api'

const URL_GET_INGREDIENTS = `${BASE_URL}/ingredients`;
const URL_POST_ORDER = `${BASE_URL}/orders`;
const URL_REGISTER_USER = `${BASE_URL}/auth/register`;
const URL_LOGIN_USER = `${BASE_URL}/auth/login`;
const URL_GET_USER = `${BASE_URL}/auth/user`;
const URL_UPDATE_USER = `${BASE_URL}/auth/user`;
const URL_LOGOUT = `${BASE_URL}/auth/logout`;
const URL_REFRESH_TOKEN = `${BASE_URL}/auth/token`;
const URL_RESET_PASSWORD = `${BASE_URL}/password-reset`;
const URL_SAVE_RESET_PASSWORD = `${BASE_URL}/password-reset/reset`;

const checkResponse = (res: Response) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
}

const updateTokenHeaders: any = {
    'Content-Type': 'application/json',
    authorization: getCookie('accessToken')
}

export const getDataRequest = () => {
    return fetch(URL_GET_INGREDIENTS)
        .then(checkResponse)
}

export const postOrderRequest = (data: Array<string>) => {
    return fetch(URL_POST_ORDER, {
        method: 'POST',
        body: JSON.stringify({"ingredients": data}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(checkResponse)
}

export const registerUserRequest = (data: { name: string | ''; email: string | ''; password: string | ''; }) => {
    return fetch(URL_REGISTER_USER, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(checkResponse)
}

export const loginUserRequest = (data: { email: string; password: string; }) => {
    return fetch(URL_LOGIN_USER, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(checkResponse)
}

export const getUserProfileRequest = () => {
    return fetch(URL_GET_USER, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: updateTokenHeaders,
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
    })
        .then(checkResponse)
}

export const updateUserProfileRequest = (data: { name: string | ''; email: string | ''; password: string | ''; }) => {
    return fetch(URL_UPDATE_USER, {
        method: 'PATCH',
        body: JSON.stringify(data),
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: updateTokenHeaders,
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
    })
        .then(checkResponse)
}

export const logoutRequest = () => {
    return fetch(URL_LOGOUT, {
        method: 'POST',
        body: JSON.stringify({token: localStorage.getItem('refreshToken')}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(checkResponse)
}

export const refreshTokenRequest = () => {
    return fetch(URL_REFRESH_TOKEN, {
        method: 'POST',
        body: JSON.stringify({token: localStorage.getItem('refreshToken')}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(checkResponse)
}

export const resetPasswordRequest = (data: string) => {
    return fetch(URL_RESET_PASSWORD, {
        method: 'POST',
        body: JSON.stringify({email: data}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(checkResponse)
}

export const saveResetPasswordRequest = (data: { token: string | ''; password: string | ''; }) => {
    return fetch(URL_SAVE_RESET_PASSWORD, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(checkResponse)
}