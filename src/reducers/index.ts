import { combineReducers } from "redux";
import { pizzasReducer } from "./pizzas";
import { Pizza } from "../actions";

export interface StoreState {
  pizzas: Pizza[];
}

export const reducers = combineReducers<StoreState>({
  pizzas: pizzasReducer,
});
