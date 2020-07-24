import React, { CSSProperties } from "react";
import { connect } from "react-redux";
import { AutoSizer, Table, Column } from "react-virtualized";
import { StoreState } from "../reducers";
import { CartPizza } from "../reducers/cart";
import { Pizza } from "../actions";
import { Button } from "antd";
import { TableHeaderProps } from "react-virtualized";
import { nameFormatter, subtotalFormatter } from "./utils";
import { CartGrid } from "./CartGrid";
import { TableRowInterface } from "./CartGrid";

interface CartInterface {
  cart: CartPizza[];
  cartPizzas: Map<string, Pizza | undefined>;
  height: number;
}

interface CartStateInterface {
  rows: CartPizza[];
}

class _Cart extends React.Component<CartInterface, CartStateInterface> {
  constructor(props: CartInterface) {
    super(props);
    const { cart } = props;

    this.state = {
      rows: cart,
    };
  }

  rowGetter = ({ index }: { index: number }): TableRowInterface => {
    const { rows } = this.state;
    const { cartPizzas } = this.props;
    const pizza = rows[index];
    const name = cartPizzas.get(pizza._id)?.name;
    const price = cartPizzas.get(pizza._id)?.price;
    return { ...rows[index], name, price };
  };

  render() {
    const { height } = this.props;
    const { rows } = this.state;

    // TODO Render subtotal
    // TODO Render total

    // const pizzasInCart = cart.map((p) => (
    //   <li key={p._id}>{cartPizzas.get(p._id)?.name}</li>
    // ));

    return (
      <CartGrid rowGetter={this.rowGetter} length={rows.length}/>
    );
  }
}

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
