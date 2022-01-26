import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const CartWidget = () => {
  const { cart } = useContext(CartContext);
  let number = 0;
  if (cart.length !== 0) {
    cart.forEach((product) => {
      number += parseInt(product.quantity);
    });
  }
  return (
    <>
      {number !== 0 ? <span>{number} </span> : ""}
      <i className="fas fa-shopping-bag"></i>
    </>
  );
};

export default CartWidget;
