import { ActionType, Action } from './actionTypes';
import { Dispatch } from 'redux';
import carService from '../services/carService';
import { CarFormValues } from '../../../pages/AddVehicle';

export const getCars = () => async (dispatch: Dispatch<Action>) => {
    try {
        dispatch({ type: ActionType.GET_CARS_REQUEST })

        const data = await carService.getCars();

        dispatch({
            type: ActionType.GET_CARS_SUCCESS,
            payload: data
        })
    } catch (error: any) {
        dispatch({
            type: ActionType.GET_CARS_FAIL,
            payload: (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        })
    }
}

export const getCarsByFilter = (arg: any) => async (dispatch: Dispatch<Action>) => {
    try {
        dispatch({ type: ActionType.GET_CARS_REQUEST })

        const data = await carService.getCarsByFilter(arg);

        dispatch({
            type: ActionType.GET_CARS_SUCCESS,
            payload: data
        })
    } catch (error: any) {
        dispatch({
            type: ActionType.GET_CARS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const sortCars = (value: string) => async (dispatch: Dispatch<Action>) => {
    try {
        dispatch({ type: ActionType.GET_CARS_REQUEST })

        const data = await carService.sortCars(value);

        dispatch({
            type: ActionType.GET_CARS_SUCCESS,
            payload: data
        })
    } catch (error: any) {
        dispatch({
            type: ActionType.GET_CARS_FAIL,
            payload: (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        })
    }
}

export const getCarById = (carId: string) => async (dispatch: Dispatch<Action>) => {
    try {
        dispatch({ type: ActionType.GET_CAR_REQUEST })

        const data = await carService.getCarById(carId);

        dispatch({
            type: ActionType.GET_CAR_SUCCESS,
            payload: data
        })
    } catch (error: any) {
        dispatch({
            type: ActionType.GET_CAR_FAIL,
            payload: (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        })
    }
}

export const createCar = (carData: CarFormValues) => async (dispatch: Dispatch<Action>) => {
    try {
        dispatch({ type: ActionType.CREATE_CAR_REQUEST })

        const data = await carService.createCar(carData);

        dispatch({
            type: ActionType.CREATE_CAR_SUCCESS,
            payload: data
        })
    } catch (error: any) {
        dispatch({
            type: ActionType.CREATE_CAR_FAIL,
            payload: (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        })
    }
}

export const reset = () => async (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.RESET })
}
