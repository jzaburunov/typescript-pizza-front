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

  render() {
    const { addPizza, pizzas } = this.props;
    return (
      <div className="row">
        {pizzas.map((pizza: Pizza) => {
          return <PizzaComponent pizza={pizza} addPizza={addPizza} />;
        })}
      </div>
    );
  }
}

// TODO Check if return type is required
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
