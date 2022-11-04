import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./auth/reducers/authReducer";
import { carReducer } from "./car/reducers/carReducer";
import { reservationReducer } from "./reservation/reducers/reservationReducer";
import { categoryReducer } from "./category/reducers/categoryReducer";

const reducer = combineReducers({
  auth: authReducer,
  car: carReducer,
  reservation: reservationReducer,
  category: categoryReducer,
});

// Uncomment when debugging
// import { composeWithDevTools } from "redux-devtools-extension";
// const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

// Comment out when debugging
const store = createStore(reducer, applyMiddleware(thunk));

export default store;
export type RootState = ReturnType<typeof reducer>;
