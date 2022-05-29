import { Reservation } from "../reducers/reservationReducer";

export enum ActionType {
    CREATE_RESERVATION_REQUEST = "CREATE_RESERVATION_REQUEST",
    CREATE_RESERVATION_SUCCESS = "CREATE_RESERVATION_SUCCESS",
    CREATE_RESERVATION_FAIL = "CREATE_RESERVATION_FAIL",
    GET_RESERVATIONS_REQUEST = "GET_RESERVATIONS_REQUEST",
    GET_RESERVATIONS_SUCCESS = "GET_RESERVATIONS_SUCCESS",
    GET_RESERVATIONS_FAIL = "GET_RESERVATIONS_FAIL",
    DELETE_RESERVATION_SUCCESS = "DELETE_RESERVATION_SUCCESS",
    DELETE_RESERVATION_FAIL = "DELETE_RESERVATION_FAIL",
    RESET_RESERVATION = "RESET_RESERVATION"
}

interface actionPending {
    type: ActionType.CREATE_RESERVATION_REQUEST | ActionType.RESET_RESERVATION | ActionType.GET_RESERVATIONS_REQUEST;
}

interface actionSuccess {
    type: ActionType.CREATE_RESERVATION_SUCCESS,
    payload: Reservation
}

interface actionAllSuccess {
    type: ActionType.GET_RESERVATIONS_SUCCESS,
    payload: Reservation[]
}

interface actionDeleteSuccess {
    type: ActionType.DELETE_RESERVATION_SUCCESS,
    payload: string
}

interface actionFail {
    type: ActionType.CREATE_RESERVATION_FAIL | ActionType.GET_RESERVATIONS_FAIL | ActionType.DELETE_RESERVATION_FAIL,
    payload: string
}

export type Action = actionPending | actionSuccess | actionAllSuccess | actionFail | actionDeleteSuccess;
