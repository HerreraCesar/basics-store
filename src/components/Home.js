import { collection, getDocs, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import db from "../services/firebase";
import ItemList from "./catalogue/ItemList";
import Loader from "./Loader";

const Home = () => {

  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    
    const reference = query(
      collection(db, "products"),
      orderBy('price')
    )

    getDocs(reference).then((querySnapshot) => {
      setProducts(
        querySnapshot.docs.map((e) => {
          return { ...e.data(), id: e.id };
        })
      );
      setLoading(false);
    });
  }, []);


  return (
    <>
    <div className="home">
      <div><span>BEBIDAS</span></div>
      <div><span>ALMACEN</span></div>
      <div><span>LIMPIEZA</span></div>
    </div>
    <h1>Algunos de nuestros productos:</h1>
    {isLoading ? <Loader /> : <ItemList products={products} />}
    </>
  );
};

export default Home;
