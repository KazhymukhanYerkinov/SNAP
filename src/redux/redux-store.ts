import thunkMiddlewere, { ThunkAction } from "redux-thunk";
import { Action, applyMiddleware, combineReducers, createStore } from 'redux';

import usersStore from './users-store/users-reducer';

const rootReducer = combineReducers({
  usersStore,
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;

export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

// @ts-ignore
let store = createStore(rootReducer, applyMiddleware(thunkMiddlewere));
export default store;

