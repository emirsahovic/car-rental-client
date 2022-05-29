import { ActionType, Action } from "../actions/actionTypes";

export interface Reservation {
    _id: string,
    carModel: string,
    location: string,
    pickUpDate: Date | string,
    returnDate: Date | string,
    user: string,
    carId: string
}

interface State {
    reservations: Reservation[],
    reservation: Reservation,
    isSuccessRes: boolean,
    isLoadingRes: boolean,
    isErrorRes: boolean,
    messageRes: string,
}

const initialState = {
    reservations: [],
    reservation: {
        _id: '',
        carModel: '',
        location: '',
        pickUpDate: '',
        returnDate: '',
        user: '',
        carId: ''
    },
    isSuccessRes: false,
    isLoadingRes: false,
    isErrorRes: false,
    messageRes: ''
}

export const reservationReducer = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case ActionType.CREATE_RESERVATION_REQUEST:
        case ActionType.GET_RESERVATIONS_REQUEST:
            return { ...state, isLoadingRes: true }
        case ActionType.CREATE_RESERVATION_SUCCESS:
            return { ...state, isLoadingRes: false, isSuccessRes: true, isErrorRes: false, reservations: [...state.reservations, action.payload] }
        case ActionType.GET_RESERVATIONS_SUCCESS:
            return { ...state, isLoadingRes: false, isSuccessRes: true, isErrorRes: false, reservations: action.payload }
        case ActionType.DELETE_RESERVATION_SUCCESS:
            return { ...state, isLoadingRes: false, isErrorRes: false, reservations: state.reservations.filter((res: Reservation) => res._id !== action.payload) }
        case ActionType.CREATE_RESERVATION_FAIL:
        case ActionType.GET_RESERVATIONS_FAIL:
        case ActionType.DELETE_RESERVATION_FAIL:
            return { ...state, isErrorRes: true, isSuccessRes: false, isLoadingRes: false, messageRes: action.payload }
        case ActionType.RESET_RESERVATION:
            return { ...state, isErrorRes: false, isSuccessRes: false, isLoadingRes: false, messageRes: '' }
        default:
            return state
    }
}
