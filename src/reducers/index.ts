import { combineReducers } from "redux";
import { reducer as formReducer, FormReducer } from "redux-form";
import { sessionReducer } from "./session";
import { pizzasReducer } from "./pizzas";
import { cartReducer, CartPizza } from "./cart";
import { Pizza } from "../actions";

export interface StoreState {
  pizzas: Pizza[];
  cart: CartPizza[];
  form: FormReducer | any; // TODO Fix that
  session: boolean
}

export const reducers = combineReducers<StoreState>({
  pizzas: pizzasReducer,
  cart: cartReducer,
  form: formReducer,
  session: sessionReducer
});
