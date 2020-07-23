import { combineReducers } from "redux";
import { pizzasReducer } from "./pizzas";
import { cartReducer, CartPizza  } from "./cart";
import { Pizza } from "../actions";

export interface StoreState {
  pizzas: Pizza[];
  cart: CartPizza[];
}

export const reducers = combineReducers<StoreState>({
  pizzas: pizzasReducer,
  cart: cartReducer
});
