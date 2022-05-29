import { User } from "../reducers/authReducer";

export enum ActionType {
    LOGIN_REQUEST = "LOGIN_REQUEST",
    LOGIN_SUCCESS = "LOGIN_SUCCESS",
    LOGIN_FAIL = "LOGIN_FAIL",
    REGISTER_REQUEST = "REGISTER_REQUEST",
    REGISTER_SUCCESS = "REGISTER_SUCCESS",
    REGISTER_FAIL = "REGISTER_FAIL",
    LOGOUT_REQUEST = "LOGOUT_REQUEST",
    LOGOUT_SUCCESS = "LOGOUT_SUCCESS",
    GET_USERS_REQUEST = "GET_USERS_REQUEST",
    GET_USERS_SUCCESS = "GET_USERS_SUCCESS",
    GET_USERS_FAIL = "GET_USERS_FAIL",
    DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS",
    DELETE_USER_FAIL = "DELETE_USER_FAIL",
    RESET = "RESET"
}

interface actionPending {
    type: ActionType.LOGIN_REQUEST | ActionType.LOGOUT_REQUEST | ActionType.REGISTER_REQUEST | ActionType.GET_USERS_REQUEST
}

interface actionSuccess {
    type: ActionType.LOGIN_SUCCESS,
    payload: User
}

interface actionUsersSuccess {
    type: ActionType.GET_USERS_SUCCESS,
    payload: User[]
}

interface actionDeleteUserSuccess {
    type: ActionType.DELETE_USER_SUCCESS,
    payload: string
}

interface actionFail {
    type: ActionType.LOGIN_FAIL | ActionType.REGISTER_FAIL | ActionType.GET_USERS_FAIL | ActionType.DELETE_USER_FAIL
    payload: string
}

interface actionSuccessNoPayload {
    type: ActionType.LOGOUT_SUCCESS | ActionType.REGISTER_SUCCESS | ActionType.RESET
}

export type Action = actionPending | actionSuccess | actionUsersSuccess | actionDeleteUserSuccess | actionFail | actionSuccessNoPayload;
