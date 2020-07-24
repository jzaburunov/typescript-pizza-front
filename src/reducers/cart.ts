import { ActionTypes } from "../actions/types";
import { AppActions } from "../actions";

export interface CartPizza {
  _id: string;
  quantity: number;
  subtotal: number;
}

export const cartReducer = (state: CartPizza[] = [], action: AppActions) => {
  switch (action.type) {
    case ActionTypes.addToCart:
      const { _id, price } = action.payload;
      let product = state.find((p) => p._id === _id);
      if (product) {
        return state;
      }
      let newState = state.slice();
      const quantity = 1;
      const subtotal = price * quantity;
      newState.push({ _id, quantity, subtotal });
      return newState;
    default:
      return state;
  }
};
