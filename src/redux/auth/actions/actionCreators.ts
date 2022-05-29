import { ActionType, Action } from './actionTypes';
import { Dispatch } from 'redux';
import { FormLoginValues } from '../../../pages/Login';
import authService from '../services/authService';
import { FormRegisterValues } from '../../../pages/Register';

export const loginUser = (userData: FormLoginValues) => async (dispatch: Dispatch<Action>) => {
    try {
        dispatch({ type: ActionType.LOGIN_REQUEST })

        const data = await authService.loginUser(userData);

        dispatch({
            type: ActionType.LOGIN_SUCCESS,
            payload: data
        })
    } catch (error: any) {
        dispatch({
            type: ActionType.LOGIN_FAIL,
            payload: (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        })
    }
}

export const registerUser = (userData: FormRegisterValues) => async (dispatch: Dispatch<Action>) => {
    try {
        dispatch({ type: ActionType.REGISTER_REQUEST })

        await authService.registerUser(userData);

        dispatch({ type: ActionType.REGISTER_SUCCESS })
    } catch (error: any) {
        dispatch({
            type: ActionType.REGISTER_FAIL,
            payload: (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        })
    }
}

export const logout = () => async (dispatch: Dispatch<Action>) => {
    try {
        dispatch({ type: ActionType.LOGOUT_REQUEST })
        await authService.logout();
        dispatch({ type: ActionType.LOGOUT_SUCCESS })
    } catch (error: any) {
        console.error(error);
    }
}

export const getUsers = () => async (dispatch: Dispatch<Action>) => {
    try {
        dispatch({ type: ActionType.GET_USERS_REQUEST })

        const data = await authService.getUsers();

        dispatch({
            type: ActionType.GET_USERS_SUCCESS,
            payload: data
        })
    } catch (error: any) {
        dispatch({
            type: ActionType.GET_USERS_FAIL,
            payload: (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        })
    }
}


export const deleteUser = (userId: string) => async (dispatch: Dispatch<Action>) => {
    try {
        const data = await authService.deleteUser(userId);

        dispatch({
            type: ActionType.DELETE_USER_SUCCESS,
            payload: data.id
        })
    } catch (error: any) {
        dispatch({
            type: ActionType.DELETE_USER_FAIL,
            payload: (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        })
    }
}

export const reset = () => async (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.RESET });
}