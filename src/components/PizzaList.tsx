import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPizzas as fetchPizzasAction, Pizza } from "../actions";
import { StoreState } from "../reducers";
import { Pizza as PizzaComponent } from "./Pizza";

interface PizzaListInterface {
  fetchPizzas(): any; // not very cool
  pizzas: Pizza[];
}

class _PizzaList extends Component<PizzaListInterface> {
  componentDidMount() {
    const { fetchPizzas } = this.props;
    fetchPizzas();
  }

  renderList(): JSX.Element[] {
    const pizzas = this.props.pizzas.map((pizza: Pizza) => {
      return <PizzaComponent pizza={pizza} />;
    });
    return pizzas;
  }

  render() {
    const pizzas = this.renderList();
    return <ul>{pizzas}</ul>;
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
  }
)(_PizzaList);
