import React from "react";
import { Pizza as PizzaDataInterface } from "../actions";

interface PizzaInterface {
  pizza: PizzaDataInterface;
}

export const Pizza = (props: PizzaInterface) => {
  const { pizza } = props;
  return <li key={pizza._id}>{pizza.name}</li>;
};
