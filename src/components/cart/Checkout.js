import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import { Link } from "react-router-dom";
import db from "../../services/firebase";

const Checkout = () => {
  const { cart, purchase, clearCart, changeMessage } = useContext(CartContext);

  let items = [];

  cart.forEach((p) => {
    items.push({
      id: p.id,
      name: p.name,
      price: p.price,
      quantity: p.quantity,
      sku: p.sku,
    });
  });

  const [data, setData] = useState({
    name: "",
    phone: "",
    email: "",
    emailVerification: "",
    items: items,
    date: new Date(),
    total: purchase.total,
    order: "",
  });

  const [lastId, setLastId] = useState("");

  useEffect((data) => {
    const reference = collection(db, "orders");

    getDocs(reference).then((querySnapshot) => {
      setData({
        ...data,
        order: querySnapshot.size + 1,
      });
    });
  }, []);

  const sendData = async () => {
    const db = getFirestore();
    const { id } = await addDoc(collection(db, "orders"), data);
    setLastId(id);
    clearCart();
    changeMessage("Datos enviados con éxito");
  };

  function changeData(event) {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <div className="purchase">
      {cart.length > 0 ? (
        <form>
          <h2>Checkout</h2>
          <input
            onChange={changeData}
            type="text"
            name="name"
            required
            placeholder="nombre"
          ></input>
          <input
            onChange={changeData}
            type="tel"
            name="phone"
            required
            placeholder="teléfono"
          ></input>
          <input
            onChange={changeData}
            type="email"
            name="email"
            required
            placeholder="correo electrónico"
          ></input>
          <input
            onChange={changeData}
            type="email"
            name="emailVerification"
            required
            placeholder="confirme correo electrónico"
          ></input>
          <button
            type="submit"
            className="button"
            disabled={
              data.email !== data.emailVerification ||
              data.name === undefined ||
              data.phone === undefined ||
              data.email === undefined ||
              data.emailVerification === undefined
                ? true
                : false
            }
            onClick={(e) => {
              e.preventDefault();
              sendData(data);
            }}
          >
            Comprar
          </button>
          <h1>{lastId}</h1>
        </form>
      ) : (
        <div className="cart">
          <h3>Su pedido ha sido realizado con éxito.</h3>
          <h3>
            Su código de operación es <span>{lastId}</span> y su número de orden
            es <span># {data.order}</span>{" "}
          </h3>
          <h1>Su carrito está vacío.</h1>
          <h3>
            Agregue algunos productos haciendo click
            <Link to="/">
              <span> aquí</span>
            </Link>
          </h3>
        </div>
      )}
    </div>
  );
};

export default Checkout;
