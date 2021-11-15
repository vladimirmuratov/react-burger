import {TUserActions} from "./types";
import {
    CHANGE_FORGOT_FORM,
    CLEAR_MESSAGE,
    CLEAR_SUCCESS_FLAG,
    CLEAR_USER_DATA,
    GET_PROFILE_START,
    GET_PROFILE_SUCCESS,
    LOGIN_FAILED,
    LOGIN_START,
    LOGIN_SUCCESS, LOGOUT_FAILED,
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


type TUserState = {
    user: any;
    isAuth: boolean;
    error: string | '';
    profile: any;
    message: string | '';
    successUpdate: boolean;
    isLoading: boolean;
    isForgotEmailForm: boolean;
}


const initialState: TUserState = {
    user: {},
    isAuth: false,
    error: '',
    profile: {},
    message: '',
    successUpdate: false,
    isLoading: false,
    isForgotEmailForm: false
}

export const userReducer = (state = initialState, action: TUserActions): TUserState => {
    switch (action.type) {
        case REGISTER_START:
            return {
                ...state,
                error: '',
                isAuth: false,
                user: {},
                isLoading: true
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                error: '',
                user: action.payload,
                isAuth: true,
                isLoading: false
            }
        case REGISTER_FAILED:
            return {
                ...state,
                error: action.payload,
                isLoading: false
            }
        case LOGIN_START:
            return {
                ...state,
                user: {},
                error: '',
                isAuth: false,
                isLoading: true
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload,
                isAuth: true,
                isLoading: false
            }
        case LOGIN_FAILED:
            return {
                ...state,
                error: action.payload,
                isLoading: false
            }
        case GET_PROFILE_START:
            return {
                ...state,
                error: '',
                isLoading: true
            }
        case GET_PROFILE_SUCCESS:
            return {
                ...state,
                profile: action.payload,
                isLoading: false,
                isAuth: true
            }
        case UPDATE_PROFILE_START:
            return {
                ...state,
                error: '',
                isLoading: true
            }
        case UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                profile: action.payload,
                successUpdate: true,
                isLoading: false
            }
        case UPDATE_PROFILE_FAILED:
            return {
                ...state,
                error: action.payload,
                isLoading: false
            }
        case LOGOUT_START:
            return {
                ...state,
                error: '',
                message: '',
                isLoading: true
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isLoading: false
            }
        case LOGOUT_FAILED:
            return {
                ...state,
                error: action.payload,
                isLoading: false
            }
        case CLEAR_USER_DATA:
            return {
                ...state,
                user: {},
                profile: {},
                error: '',
                message: '',
                isAuth: false
            }
        case CLEAR_SUCCESS_FLAG:
            return {
                ...state,
                successUpdate: false
            }
        case RESET_PASSWORD_START:
            return {
                ...state,
                message: '',
                error: '',
                isLoading: true
            }
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                message: action.payload,
                isLoading: false
            }
        case RESET_PASSWORD_FAILED:
            return {
                ...state,
                error: action.payload,
                isLoading: false
            }
        case CLEAR_MESSAGE:
            return {
                ...state,
                message: ''
            }
        case SAVE_RESET_PASSWORD_START:
            return {
                ...state,
                message: '',
                isLoading: true
            }
        case SAVE_RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                message: action.payload,
                isLoading: false
            }
        case SAVE_RESET_PASSWORD_FAILED:
            return {
                ...state,
                error: action.payload,
                isLoading: false
            }
        case CHANGE_FORGOT_FORM:
            return {
                ...state,
                isForgotEmailForm: true
            }
        default:
            return state
    }
}