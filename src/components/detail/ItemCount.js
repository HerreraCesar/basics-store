import React, { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";

const ItemCount = ({ stock, onAdd }) => {
  const [quantity, setQuantity] = useState(1);
  const { changeMessage } = useContext(CartContext);

  function modifyAmount(e) {
    if (e.target.id === "increase") {
      setQuantity(quantity + 1);
    } else if (e.target.id === "decrease") {
      setQuantity(quantity - 1);
    }
  }

  return (
    <div className="amount">
      <p className="stock">Stock: {stock}</p>
      <div className="controls">
        {quantity <= 1 ? (
          <button
            newmessage="La cantidad no puede ser inferior a uno"
            onClick={(event) => {
              changeMessage(event.target.attributes.newmessage.value);
            }}
          >
            -
          </button>
        ) : (
          <button onClick={modifyAmount} id="decrease">
            -
          </button>
        )}
        <span>{quantity}</span>
        {quantity >= stock ? (
          <button
            newmessage="La cantidad no puede superar el stock disponible"
            onClick={(event) => {
              changeMessage(event.target.attributes.newmessage.value);
            }}
          >
            +
          </button>
        ) : (
          <button onClick={modifyAmount} id="increase">
            +
          </button>
        )}
      </div>
      <button
        className="addCart"
        newmessage="Producto agregado correctamente"
        value={quantity}
        onClick={(event) => {
          onAdd(event);
          changeMessage(event.target.attributes.newmessage.value);
        }}
      >
        Agregar al carrito
      </button>
    </div>
  );
};

export default ItemCount;
