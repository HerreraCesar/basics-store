import React from "react";
import { useLocation } from "react-router-dom";
import FiltersWidget from "./FiltersWidget";
import Item from "./Item";

const ItemList = ({ products }) => {
  let location = useLocation();

  return (
    <>
      <div className="list">
        {products.map((product) => (
          <Item product={product} key={product.id} />
        ))}
      </div>
      {location.pathname === "/search" || location.pathname === "/" ? (
        ""
      ) : (
        <FiltersWidget />
      )}
    </>
  );
};

export default ItemList;
