import React from "react";
import { Pizza as PizzaDataInterface } from "../actions";
import "./Pizza.css";
import { Button } from "antd";

interface PizzaInterface {
  pizza: PizzaDataInterface;
  addPizza(pizza: PizzaDataInterface): Function; // Because thunk
}

export const Pizza: React.FC<PizzaInterface> = ({
  pizza: { name, description, image },
  pizza,
  addPizza,
}) => (
  <div className="card col-4">
    <img className="card-img-top card-image" src={image} alt={name} />
    <div className="card-body">
      <h5 className="card-title">{name}</h5>
      <p className="card-text">{description}</p>
      <Button onClick={() => addPizza(pizza)}>Order</Button>
    </div>
  </div>
);
