import React from "react";
import { Pizza as PizzaDataInterface } from "../actions";
import "./Pizza.css";

interface PizzaInterface {
  pizza: PizzaDataInterface;
}

export const Pizza = (props: PizzaInterface) => {
  const {
    pizza: { name, description, image },
  } = props;
  return (
    <div className="card col-4">
      <img className="card-img-top card-image" src={image} alt={name} />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{description}</p>
      </div>
    </div>
  );
};
