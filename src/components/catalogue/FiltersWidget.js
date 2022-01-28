import React, { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";

const FiltersWidget = () => {
  const [active, setActive] = useState(false);
  const { applyFilter } = useContext(CartContext);

  return (
    <>
      <div
        className={active === true ? "filters activated" : "filters"}
        onClick={() => {
          setActive(!active);
        }}
      >
        <h3>FILTROS</h3>
      </div>
      <div className={active === true ? "filtersBox activated" : "filtersBox"}>
        <span>Ordenar por </span>
        <select
          className="select"
          onChange={(e) => {
            applyFilter(e.target.value);
          }}
        >
          <option value="priceUp" defaultValue>
            precio: de menor a mayor
          </option>
          <option value="priceDown">precio: de mayor a menor</option>
          <option value="nameUp">nombre: de la A a la Z</option>
          <option value="nameDown">nombre: de la Z a la A</option>
        </select>
      </div>
    </>
  );
};

export default FiltersWidget;
