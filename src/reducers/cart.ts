import { ActionTypes } from "../actions/types";
import { AppActions } from "../actions";

interface CartPizza {
  _id: string,
  quantity: number
}

export const cartReducer = (state: CartPizza[] = [], action: AppActions) => {
  switch (action.type) {
    case ActionTypes.addToCart:
      const { _id } = action.payload;
      let product = state.find((p) => p._id === _id);
      if (product) {
        return state;
      }
      let newState = state.slice();
      newState.push({ _id, quantity: 1 });
      return newState;
    default:
      return state;
  }
};
