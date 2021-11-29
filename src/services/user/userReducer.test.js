import {initialState, userReducer} from "./reducer";
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


describe('Testing User reducer', () => {

    it('should return the initial state', () => {
        const state = userReducer(undefined, {})
        expect(state).toEqual(initialState)
    })

    it('should handle REGISTER_START', () => {
        const action = {type: REGISTER_START}
        const state = userReducer(initialState, action)
        const result = {
            ...initialState,
            error: '',
            isAuth: false,
            user: {},
            isLoading: true
        }
        expect(state).toEqual(result)

    })

    it('should handle REGISTER_SUCCESS', () => {
        const action = {
            type: REGISTER_SUCCESS,
            payload: {
                accessToken: 'abc',
                refreshToken: 'qwe'
            },
            user: {
                name: 'userName',
                email: 'user@gmail.com'
            }
        }
        const state = userReducer(initialState, action)
        const result = {
            ...initialState,
            user: action.payload,
            isAuth: true,
            isLoading: false,
            error: ''
        }
        expect(state).toEqual(result)
    })

    it('should handle REGISTER_FAILED', () => {
        const action = {
            type: REGISTER_FAILED,
            payload: 'Text error'
        }
        const state = userReducer(initialState, action)
        const result = {
            ...initialState,
            error: action.payload,
            isLoading: false
        }
        expect(state).toEqual(result)
    })

    it('should handle LOGIN_START', () => {
        const action = {type: LOGIN_START}
        const state = userReducer(initialState, action)
        const result = {
            ...initialState,
            user: {},
            error: '',
            isAuth: false,
            isLoading: true
        }
        expect(state).toEqual(result)
    })

    it('should handle LOGIN_SUCCESS', () => {
        const action = {
            type: LOGIN_SUCCESS,
            payload: {
                accessToken: 'abc',
                refreshToken: 'qwe'
            },
            user: {
                name: 'userName',
                email: 'user@gmail.com'
            }
        }
        const state = userReducer(initialState, action)
        const result = {
            ...initialState,
            user: action.payload,
            isAuth: true,
            isLoading: false
        }
        expect(state).toEqual(result)
    })

    it('should handle LOGIN_FAILED', () => {
        const action = {
            type: LOGIN_FAILED,
            payload: 'Text error'
        }
        const state = userReducer(initialState, action)
        const result = {
            ...initialState,
            error: action.payload,
            isLoading: false
        }
        expect(state).toEqual(result)
    })

    it('should handle GET_PROFILE_START', () => {
        const action = {type: GET_PROFILE_START}
        const state = userReducer(initialState, action)
        const result = {
            ...initialState,
            error: '',
            isLoading: true
        }
        expect(state).toEqual(result)
    })

    it('should handle GET_PROFILE_SUCCESS', () => {
        const action = {
            type: GET_PROFILE_SUCCESS,
            payload: {
                name: 'userName',
                email: 'user@gmail.com'
            }
        }
        const state = userReducer(initialState, action)
        const result = {
            ...initialState,
            profile: action.payload,
            isLoading: false,
            isAuth: true
        }
        expect(state).toEqual(result)
    })

    it('should handle UPDATE_PROFILE_START', () => {
        const action = {type: UPDATE_PROFILE_START}
        const state = userReducer(initialState, action)
        const result = {
            ...initialState,
            error: '',
            isLoading: true
        }
        expect(state).toEqual(result)
    })

    it('should handle UPDATE_PROFILE_SUCCESS', () => {
        const action = {
            type: UPDATE_PROFILE_SUCCESS,
            payload: {
                name: 'userName',
                email: 'user@gmail.com'
            }
        }
        const state = userReducer(initialState, action)
        const result = {
            ...initialState,
            profile: action.payload,
            successUpdate: true,
            isLoading: false
        }
        expect(state).toEqual(result)
    })

    it('should handle UPDATE_PROFILE_FAILED', () => {
        const action = {
            type: UPDATE_PROFILE_FAILED,
            payload: 'Text error'
        }
        const state = userReducer(initialState, action)
        const result = {
            ...initialState,
            error: action.payload,
            isLoading: false
        }
        expect(state).toEqual(result)
    })

    it('should handle LOGOUT_START', () => {
        const action = {type: LOGOUT_START}
        const state = userReducer(initialState, action)
        const result = {
            ...initialState,
            error: '',
            message: '',
            isLoading: true
        }
        expect(state).toEqual(result)
    })

    it('should handle LOGOUT_SUCCESS', () => {
        const action = {type: LOGOUT_SUCCESS}
        const state = userReducer(initialState, action)
        const result = {
            ...initialState,
            isLoading: false
        }
        expect(state).toEqual(result)
    })

    it('should handle LOGOUT_FAILED', () => {
        const action = {
            type: LOGOUT_FAILED,
            payload: 'Text error'
        }
        const state = userReducer(initialState, action)
        const result = {
            ...initialState,
            error: action.payload,
            isLoading: false
        }
        expect(state).toEqual(result)
    })

    it('should handle CLEAR_USER_DATA', () => {
        const action = {type: CLEAR_USER_DATA}
        const state = userReducer(initialState, action)
        const result = {
            ...initialState,
            user: {},
            profile: {},
            error: '',
            message: '',
            isAuth: false
        }
        expect(state).toEqual(result)
    })

    it('should handle CLEAR_SUCCESS_FLAG', () => {
        const action = {type: CLEAR_SUCCESS_FLAG}
        const state = userReducer(initialState, action)
        const result = {
            ...initialState,
            successUpdate: false
        }
        expect(state).toEqual(result)
    })

    it('should handle RESET_PASSWORD_START', () => {
        const action = {type: RESET_PASSWORD_START}
        const state = userReducer(initialState, action)
        const result = {
            ...initialState,
            message: '',
            error: '',
            isLoading: true
        }
        expect(state).toEqual(result)
    })

    it('should handle RESET_PASSWORD_SUCCESS', () => {
        const action = {
            type: RESET_PASSWORD_SUCCESS,
            payload: 'Text message'
        }
        const state = userReducer(initialState, action)
        const result = {
            ...initialState,
            message: action.payload,
            isLoading: false
        }
        expect(state).toEqual(result)
    })

    it('should handle RESET_PASSWORD_FAILED', () => {
        const action = {
            type: RESET_PASSWORD_FAILED,
            payload: 'Text error'
        }
        const state = userReducer(initialState, action)
        const result = {
            ...initialState,
            error: action.payload,
            isLoading: false
        }
        expect(state).toEqual(result)
    })

    it('should handle CLEAR_MESSAGE', () => {
        const action = {type: CLEAR_MESSAGE}
        const state = userReducer(initialState, action)
        const result = {
            ...initialState,
            message: ''
        }
        expect(state).toEqual(result)
    })

    it('should handle SAVE_RESET_PASSWORD_START', () => {
        const action = {type: SAVE_RESET_PASSWORD_START}
        const state = userReducer(initialState, action)
        const result = {
            ...initialState,
            message: '',
            isLoading: true
        }
        expect(state).toEqual(result)
    })

    it('should handle SAVE_RESET_PASSWORD_SUCCESS', () => {
        const action = {
            type: SAVE_RESET_PASSWORD_SUCCESS,
            payload: 'Text message'
        }
        const state = userReducer(initialState, action)
        const result = {
            ...initialState,
            message: action.payload,
            isLoading: false
        }
        expect(state).toEqual(result)
    })

    it('should handle SAVE_RESET_PASSWORD_FAILED', () => {
        const action = {
            type: SAVE_RESET_PASSWORD_FAILED,
            payload: 'Text error'
        }
        const state = userReducer(initialState, action)
        const result = {
            ...initialState,
            error: action.payload,
            isLoading: false
        }
        expect(state).toEqual(result)
    })

    it('should handle CHANGE_FORGOT_FORM', () => {
        const action = {type: CHANGE_FORGOT_FORM}
        const state = userReducer(initialState, action)
        const result = {
            ...initialState,
            isForgotEmailForm: true
        }
        expect(state).toEqual(result)
    })

})