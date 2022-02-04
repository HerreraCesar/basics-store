import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { getDocs, collection } from "firebase/firestore";
import db from "../../services/firebase";
import CartWidget from "../cart/CartWidget";

const NavBar = () => {
  const [categories, setCategories] = useState([]);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const filteredCategories = [];
    const myProducts = collection(db, "products");
    getDocs(myProducts).then((querySnapshot) => {
      querySnapshot.docs.map((product) => {
        if (!filteredCategories.includes(product.data().category)) {
          filteredCategories.push(product.data().category);
        }
        return filteredCategories;
      });

      setCategories(filteredCategories);
    });
  }, []);

  return (
    <div className="NavBar">
      <div className="logo">
        <Link
          to=""
          onClick={() => {
            setActive(false);
          }}
        >
          Basics Store
        </Link>
      </div>
      <div className={active ? "menuActive links" : "links"}>
        {categories.map((category) => (
          <NavLink
            to={`products/${category}`}
            key={category}
            onClick={() => {
              setActive(!active);
            }}
          >
            {category}
          </NavLink>
        ))}
        <NavLink
          to="products/offers"
          className="offers"
          onClick={() => {
            setActive(!active);
          }}
        >
          OFERTAS
        </NavLink>
      </div>
      <Link
        to="search"
        className="searchWidget"
        onClick={() => {
          setActive(false);
        }}
      >
        <i className="fas fa-search"></i>
      </Link>

      <Link
        to="cart"
        className="cartWidget"
        onClick={() => {
          setActive(false);
        }}
      >
        <CartWidget />
      </Link>
      <button
        className="button"
        onClick={() => {
          setActive(!active);
        }}
      >
        <i className="fas fa-bars"></i>
      </button>
    </div>
  );
};

export default NavBar;
