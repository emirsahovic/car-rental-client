import { Car, CarObj } from '../reducers/carReducer';

export enum ActionType {
    GET_CARS_REQUEST = "GET_CARS_REQUEST",
    GET_CARS_SUCCESS = "GET_CARS_SUCCESS",
    GET_CARS_FAIL = "GET_CARS_FAIL",
    GET_CAR_REQUEST = "GET_CAR_REQUEST",
    GET_CAR_SUCCESS = "GET_CAR_SUCCESS",
    GET_CAR_FAIL = "GET_CAR_FAIL",
    CREATE_CAR_REQUEST = "CREATE_CAR_REQUEST",
    CREATE_CAR_SUCCESS = "CREATE_CAR_SUCCESS",
    CREATE_CAR_FAIL = "CREATE_CAR_FAIL",
    RESET = "RESET"
}

interface actionPending {
    type: ActionType.GET_CARS_REQUEST | ActionType.GET_CAR_REQUEST | ActionType.CREATE_CAR_REQUEST | ActionType.RESET,
}

interface actionSuccess {
    type: ActionType.GET_CARS_SUCCESS,
    payload: CarObj
}

interface actionSingleCarSuccess {
    type: ActionType.GET_CAR_SUCCESS | ActionType.CREATE_CAR_SUCCESS,
    payload: Car
}

interface actionFail {
    type: ActionType.GET_CARS_FAIL | ActionType.GET_CAR_FAIL | ActionType.CREATE_CAR_FAIL
    payload: string
}

export type Action = actionPending | actionSuccess | actionFail | actionSingleCarSuccess;
