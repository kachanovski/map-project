import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleWare from "redux-thunk"
import { MapReducer } from "./MapReducer";

let reducers = combineReducers({
   map: MapReducer
})

const store = createStore(reducers, applyMiddleware(thunkMiddleWare))

export type StateType = ReturnType<typeof reducers>

export default store

// @ts-ignore
window.store = store