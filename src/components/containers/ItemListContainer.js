import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getDocs, collection, query, where, orderBy } from "firebase/firestore";
import db from "../../services/firebase";
import ItemList from "../catalogue/ItemList";
import Loader from "../Loader";
import { CartContext } from "../../context/CartContext";

const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const { categoryId } = useParams();
  const { order } = useContext(CartContext);
  let location = useLocation();

  useEffect(() => {
    const myProducts =
      categoryId === "offers"
        ? query(
            collection(db, "products"),
            where("offer", "==", true),
            orderBy(order.type, order.direction)
          )
        : query(
            collection(db, "products"),
            where("category", "==", categoryId),
            orderBy(order.type, order.direction)
          );

    getDocs(myProducts).then((querySnapshot) => {
      setProducts(
        querySnapshot.docs.map((e) => {
          return { ...e.data(), id: e.id };
        })
      );
      setLoading(false);
    });
  }, [categoryId, order]);

  return (
    <div className={location.pathname === "/search" ? "box" : "boxHeight box"}>
      {isLoading ? <Loader /> : <ItemList products={products} />}
    </div>
  );
};

export default ItemListContainer;
