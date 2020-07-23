import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchPizzas as fetchPizzasAction,
  Pizza,
  addToCart as addPizzaAction,
} from "../actions";
import { StoreState } from "../reducers";
import { Pizza as PizzaComponent } from "./Pizza";

interface PizzaListInterface {
  fetchPizzas(): Function;
  addPizza(pizza: Pizza): Function;
  pizzas: Pizza[];
}

class _PizzaList extends Component<PizzaListInterface> {
  componentDidMount() {
    const { fetchPizzas } = this.props;
    fetchPizzas();
  }

  renderList(): JSX.Element[] {
    const { addPizza } = this.props;
    const pizzas = this.props.pizzas.map((pizza: Pizza) => {
      return <PizzaComponent pizza={pizza} addPizza={addPizza} />;
    });
    return pizzas;
  }

  render() {
    const pizzas = this.renderList();
    return <div className="row">{pizzas}</div>;
  }
}

export const PizzaList = connect(
  ({ pizzas }: StoreState): { pizzas: Pizza[] } => {
    return {
      pizzas,
    };
  },
  {
    fetchPizzas: fetchPizzasAction,
    addPizza: addPizzaAction,
  }
)(_PizzaList);
