import { ActionType, Action } from "../actions/actionTypes";

export interface Category {
    _id: string,
    category: string,
}

interface State {
    categories: Category[],
    isSuccessCat: boolean,
    isLoadingCat: boolean,
    isErrorCat: boolean,
    messageCat: string,
}

const initialState = {
    categories: [],
    isSuccessCat: false,
    isLoadingCat: false,
    isErrorCat: false,
    messageCat: ''
}

export const categoryReducer = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case ActionType.GET_CATEGORIES_REQUEST:
            return { ...state, isLoadingCat: true }
        case ActionType.GET_CATEGORIES_SUCCESS:
            return { ...state, isLoadingCat: false, isSuccessCat: true, isErrorCat: false, categories: action.payload }
        case ActionType.GET_CATEGORIES_FAIL:
            return { ...state, isErrorCat: true, isSuccessCat: false, isLoadingCat: false, messageCat: action.payload }
        default:
            return state
    }
}
