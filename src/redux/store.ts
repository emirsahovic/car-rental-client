import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { authReducer } from './auth/reducers/authReducer';
import { carReducer } from './car/reducers/carReducer';
import { reservationReducer } from './reservation/reducers/reservationReducer';
import { categoryReducer } from './category/reducers/categoryReducer';

const reducer = combineReducers({
    auth: authReducer,
    car: carReducer,
    reservation: reservationReducer,
    category: categoryReducer
});

const initialState = {}

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
export type RootState = ReturnType<typeof reducer>
