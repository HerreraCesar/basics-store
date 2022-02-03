import React, { useEffect, useState } from "react";
import { getDocs, collection, query } from "firebase/firestore";
import db from "../../services/firebase";
import Loader from "../loader/Loader";
import ItemList from "../catalogue/ItemList";

const Search = () => {
  const [active, setActive] = useState("");
  const [result, setResult] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getDocs(query(collection(db, "products"))).then((querySnapshot) => {
      setProducts(
        querySnapshot.docs.map((e) => {
          return { ...e.data(), id: e.id };
        })
      );

      setLoading(false);
    });
  }, []);

  function getFilteredItems(e, products) {
    setResult(
      products.filter((product) =>
        product.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  }

  return (
    <>
      <div className={active === "" ? "searchBox" : "searchBoxMin"}>
        {isLoading ? (
          <Loader />
        ) : (
          <input
            placeholder="Buscar..."
            className="search"
            type="text"
            onKeyUp={(e) => {
              setActive(e.target.value);
              getFilteredItems(e, products);
            }}
          ></input>
        )}
      </div>
      <div className="box">
        {active === "" ? (
          ""
        ) : result.length === 0 ? (
          <h3 className="no-result">No se encontraron resultados...</h3>
        ) : (
          <ItemList products={result} />
        )}
      </div>
    </>
  );
};

export default Search;
