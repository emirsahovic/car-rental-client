import { ActionType, Action } from './actionTypes';
import { Dispatch } from 'redux';
import reservationService from '../services/reservationService';
import { FormReservationValues } from '../../../pages/Reservation';

export const resetReservation = () => async (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.RESET_RESERVATION });
}

export const createReservation = (reservationData: FormReservationValues) => async (dispatch: Dispatch<Action>) => {
    try {
        dispatch({ type: ActionType.CREATE_RESERVATION_REQUEST })

        const data = await reservationService.createReservation(reservationData);

        dispatch({
            type: ActionType.CREATE_RESERVATION_SUCCESS,
            payload: data
        })
    } catch (error: any) {
        dispatch({
            type: ActionType.CREATE_RESERVATION_FAIL,
            payload: (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        })
    }
}

export const getReservations = () => async (dispatch: Dispatch<Action>) => {
    try {
        dispatch({ type: ActionType.GET_RESERVATIONS_REQUEST })

        const data = await reservationService.getReservations();

        dispatch({
            type: ActionType.GET_RESERVATIONS_SUCCESS,
            payload: data
        })
    } catch (error: any) {
        dispatch({
            type: ActionType.GET_RESERVATIONS_FAIL,
            payload: (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        })
    }
}

export const deleteReservation = (resId: string) => async (dispatch: Dispatch<Action>) => {
    try {
        const data = await reservationService.deleteReservation(resId);

        dispatch({
            type: ActionType.DELETE_RESERVATION_SUCCESS,
            payload: data.id
        })
    } catch (error: any) {
        dispatch({
            type: ActionType.DELETE_RESERVATION_FAIL,
            payload: (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        })
    }
}
