import React from "react";
import { connect } from "react-redux";

const _Cart: React.FC = (props) => {
  // Render a list 
  return <div>Soy caja</div>;
};

export const Cart = connect()(_Cart);
