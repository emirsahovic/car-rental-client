import { ActionType, Action } from "../actions/actionTypes";

export interface Car {
    _id: string,
    brand: string,
    model: string,
    category: {
        _id: string,
        category: string
    },
    color: string,
    manufacturingYear: number,
    fuelType: string,
    price: number,
    services: string[],
    numberOfSeats: number,
    transmission: string,
    imageUrl: string[]
}

export interface CarObj {
    cars: Car[]
}

interface State {
    carsObj: CarObj,
    car: Car,
    isSuccessCar: boolean,
    isLoadingCar: boolean,
    isErrorCar: boolean,
    messageCar: string,
}

const initialState = {
    carsObj: {
        cars: []
    },
    car: {
        _id: '',
        brand: '',
        model: '',
        category: {
            _id: '',
            category: ''
        },
        color: '',
        manufacturingYear: 0,
        fuelType: '',
        price: 0,
        services: [],
        numberOfSeats: 0,
        transmission: '',
        imageUrl: []
    },
    isSuccessCar: false,
    isLoadingCar: false,
    isErrorCar: false,
    messageCar: ''
}

export const carReducer = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case ActionType.GET_CARS_REQUEST:
        case ActionType.GET_CAR_REQUEST:
        case ActionType.CREATE_CAR_REQUEST:
            return { ...state, isLoadingCar: true }
        case ActionType.GET_CARS_SUCCESS:
            return { ...state, isLoadingCar: false, isSuccessCar: true, isErrorCar: false, carsObj: action.payload }
        case ActionType.GET_CAR_SUCCESS:
            return { ...state, isLoadingCar: false, isSuccessCar: true, isErrorCar: false, car: action.payload }
        case ActionType.CREATE_CAR_SUCCESS:
            return { ...state, isLoadingCar: false, isSuccessCar: true, isErrorCar: false }
        case ActionType.GET_CARS_FAIL:
        case ActionType.GET_CAR_FAIL:
            return { ...state, isErrorCar: true, isSuccessCar: false, isLoadingCar: false, messageCar: action.payload }
        case ActionType.RESET:
            return { ...state, isSuccessCar: false, isLoadingCar: false, isErrorCar: false }
        default:
            return state
    }
}
