import {getCookie} from "../services/utils";

const URL_GET_INGREDIENTS = 'https://norma.nomoreparties.space/api/ingredients';
const URL_POST_ORDER = 'https://norma.nomoreparties.space/api/orders';
const URL_REGISTER_USER = 'https://norma.nomoreparties.space/api/auth/register';
const URL_LOGIN_USER = 'https://norma.nomoreparties.space/api/auth/login';
const URL_GET_USER = 'https://norma.nomoreparties.space/api/auth/user';
const URL_UPDATE_USER = 'https://norma.nomoreparties.space/api/auth/user';
const URL_LOGOUT = 'https://norma.nomoreparties.space/api/auth/logout';
const URL_REFRESH_TOKEN = 'https://norma.nomoreparties.space/api/auth/token';
const URL_RESET_PASSWORD = 'https://norma.nomoreparties.space/api/password-reset';
const URL_SAVE_RESET_PASSWORD = 'https://norma.nomoreparties.space/api/password-reset/reset';

const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
}

export const getDataRequest = () => {
    return fetch(URL_GET_INGREDIENTS)
        .then(checkResponse)
}

export const postOrderRequest = (data) => {
    return fetch(URL_POST_ORDER, {
        method: 'POST',
        body: JSON.stringify({"ingredients": data}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(checkResponse)
}

export const registerUserRequest = (data) => {
    return fetch(URL_REGISTER_USER, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(checkResponse)
}

export const loginUserRequest = (data) => {
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
        headers: {
            'Content-Type': 'application/json',
            Authorization: getCookie('accessToken')
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
    })
        .then(checkResponse)
}

export const updateUserProfileRequest = (data) => {
    return fetch(URL_UPDATE_USER, {
        method: 'PATCH',
        body: JSON.stringify(data),
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            Authorization: getCookie('accessToken')
        },
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

export const resetPasswordRequest = (data) => {
    return fetch(URL_RESET_PASSWORD, {
        method: 'POST',
        body: JSON.stringify({email: data}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(checkResponse)
}

export const saveResetPasswordRequest = (data) => {
    return fetch(URL_SAVE_RESET_PASSWORD, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(checkResponse)
}