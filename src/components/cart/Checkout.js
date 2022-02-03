import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import { Link } from "react-router-dom";
import db from "../../services/firebase";

const Checkout = () => {
  const { cart, purchase, clearCart, changeMessage, clearPurchase } =
    useContext(CartContext);

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

  const [orderNumber, setOrderNumber] = useState();

  const [data, setData] = useState({
    name: "",
    phone: "",
    email: "",
    emailVerification: "",
    items: items,
    date: new Date(),
    total: purchase.total,
  });

  const [lastId, setLastId] = useState("");

  useEffect(() => {
    const reference = collection(db, "orders");

    getDocs(reference).then((querySnapshot) => {
      setOrderNumber(querySnapshot.size + 1);
    });
  }, [orderNumber]);

  const sendData = async () => {
    setData({
      ...data,
      order: orderNumber,
    });
    const db = getFirestore();
    const { id } = await addDoc(collection(db, "orders"), {
      date: data.date,
      email: data.email,
      name: data.name,
      phone: data.phone,
      order: orderNumber,
      total: data.total,
      items: data.items,
    });
    setLastId(id);
    clearCart();
    clearPurchase();
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
              data.name === "" ||
              data.phone === "" ||
              data.email === "" ||
              data.emailVerification === ""
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
