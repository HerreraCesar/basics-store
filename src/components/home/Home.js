import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import db from "../../services/firebase";
import ItemList from "../catalogue/ItemList";
import Loader from "../loader/Loader";
import "animate.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const reference = query(
      collection(db, "products"),
      orderBy("stock", "desc"),
      limit(6)
    );

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
        <div>
          <span>Basics Store</span>
          <p className="animate__animated animate__bounceInUp ">
            • comprá desde tu casa •
          </p>
        </div>
      </div>
      <div className="container">
        <h1>Productos destacados:</h1>
        {isLoading ? <Loader /> : <ItemList products={products} />}
      </div>
    </>
  );
};

export default Home;
