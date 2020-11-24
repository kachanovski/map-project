import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleWare from "redux-thunk"
import { MapReducer } from "./MapReducer";
import {BookmarksReducer} from './BookmarksReducer';

let reducers = combineReducers({
   map: MapReducer,
   books: BookmarksReducer
})

const store = createStore(reducers, applyMiddleware(thunkMiddleWare))

export type StateType = ReturnType<typeof reducers>

export default store

// @ts-ignore
window.store = store