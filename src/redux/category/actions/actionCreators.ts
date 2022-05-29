import { ActionType, Action } from './actionTypes';
import { Dispatch } from 'redux';
import categoryService from '../services/categoryService';

export const getCategories = () => async (dispatch: Dispatch<Action>) => {
    try {
        dispatch({ type: ActionType.GET_CATEGORIES_REQUEST })

        const data = await categoryService.getCategories();

        dispatch({
            type: ActionType.GET_CATEGORIES_SUCCESS,
            payload: data
        })
    } catch (error: any) {
        dispatch({
            type: ActionType.GET_CATEGORIES_FAIL,
            payload: (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        })
    }
}
