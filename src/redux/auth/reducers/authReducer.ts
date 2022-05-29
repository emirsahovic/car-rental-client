import { ActionType, Action } from "../actions/actionTypes";

const user = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')!);

export interface User {
    _id: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string
}

interface State {
    users: User[]
    user: User | null
    isLoadingLogin: boolean,
    isSuccessLogin: boolean,
    isErrorLogin: boolean,
    messageLogin: string,
    isLoadingRegister: boolean,
    isSuccessRegister: boolean,
    isErrorRegister: boolean,
    messageRegister: string,
    isLoadingLogout: boolean,
    isLoadingUsers: boolean,
    isSuccessUsers: boolean,
    isErrorUsers: boolean,
    messageUsers: string
}

const initialState = {
    users: [],
    user: user ? user : null,
    isLoadingLogin: false,
    isSuccessLogin: false,
    isErrorLogin: false,
    messageLogin: '',
    isLoadingRegister: false,
    isSuccessRegister: false,
    isErrorRegister: false,
    messageRegister: '',
    isLoadingLogout: false,
    isLoadingUsers: false,
    isSuccessUsers: false,
    isErrorUsers: false,
    messageUsers: '',
}

export const authReducer = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case ActionType.LOGIN_REQUEST:
            return { ...state, isLoadingLogin: true }
        case ActionType.REGISTER_REQUEST:
            return { ...state, isLoadingRegister: true }
        case ActionType.GET_USERS_REQUEST:
            return { ...state, isLoadingUsers: true }
        case ActionType.LOGIN_SUCCESS:
            return { ...state, isSuccessLogin: true, isErrorLogin: false, user: action.payload }
        case ActionType.REGISTER_SUCCESS:
            return { ...state, isLoadingRegister: false, isSuccessRegister: true, isErrorRegister: false }
        case ActionType.GET_USERS_SUCCESS:
            return { ...state, isLoadingUsers: false, isSuccessUsers: true, isErrorUsers: false, users: action.payload }
        case ActionType.DELETE_USER_SUCCESS:
            return { ...state, isLoadingUsers: false, isErrorUsers: false, users: state.users.filter((user: User) => user._id !== action.payload) }
        case ActionType.LOGIN_FAIL:
            return { ...state, isErrorLogin: true, isSuccessLogin: false, isLoadingLogin: false, messageLogin: action.payload }
        case ActionType.REGISTER_FAIL:
            return { ...state, isErrorRegister: true, isSuccessRegister: false, isLoadingRegister: false, messageRegister: action.payload }
        case ActionType.GET_USERS_FAIL:
        case ActionType.DELETE_USER_FAIL:
            return { ...state, isErrorUsers: true, isSuccessUsers: false, isLoadingUsers: false, messageUsers: action.payload }
        case ActionType.LOGOUT_REQUEST:
            return { ...state, isLoadingLogout: true }
        case ActionType.LOGOUT_SUCCESS:
            return { ...state, isLoadingLogout: false, isSuccessLogin: false, isLoadingLogin: false, user: null }
        case ActionType.RESET:
            return { ...state, isErrorLogin: false, messageLogin: '', }
        default:
            return state
    }
}
