import {createStore, applyMiddleware} from "redux";
import rootReducer from "../reducers/rootReducer";
import thunk from "redux-thunk";
import logger from "redux-logger";

const initialState = {};

const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk)
);
export default store;