import React from "react";
import { connect } from "react-redux";
import { StoreState } from "../reducers";
import { CartPizza } from "../reducers/cart";
import { Pizza } from "../actions";

interface CartInterface {
  cart: CartPizza[];
  cartPizzas: Map<string, Pizza | undefined>;
}

const _Cart: React.FC<CartInterface> = (props) => {
  const { cartPizzas, cart } = props;
  // Render a list
  const pizzasInCart = cart.map((p) => (
    <li key={p._id}>{cartPizzas.get(p._id)?.name}</li>
  ));

  return <ul>{pizzasInCart}</ul>;
};

function mapStateToProps(state: StoreState) {
  // TODO Use selector to select pizzas from store by _id
  const { cart, pizzas } = state;

  const cartPizzas = cart.reduce((res: Map<string, Pizza>, current) => {
    const found = pizzas.find((i) => i._id === current._id);
    if (found) {
      res.set(current._id, found);
    }
    return res;
  }, new Map<string, Pizza>());
  return {
    cart,
    cartPizzas,
  };
}

export const Cart = connect(mapStateToProps)(_Cart);
