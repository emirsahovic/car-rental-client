import { Category } from "../reducers/categoryReducer";

export enum ActionType {
    GET_CATEGORIES_REQUEST = "GET_CATEGORIES_REQUEST",
    GET_CATEGORIES_SUCCESS = "GET_CATEGORIES_SUCCESS",
    GET_CATEGORIES_FAIL = "GET_CATEGORIES_FAIL"
}

interface actionPending {
    type: ActionType.GET_CATEGORIES_REQUEST,
}

interface actionSuccess {
    type: ActionType.GET_CATEGORIES_SUCCESS,
    payload: Category[]
}

interface actionFail {
    type: ActionType.GET_CATEGORIES_FAIL,
    payload: string
}

export type Action = actionPending | actionSuccess | actionFail;
