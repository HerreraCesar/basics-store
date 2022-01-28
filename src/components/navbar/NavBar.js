import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { getDocs, collection } from "firebase/firestore";
import db from "../../services/firebase";
import CartWidget from "../cart/CartWidget";

const NavBar = () => {
  const [categories, setCategories] = useState([]);

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
        <Link to="">Basics Store</Link>
      </div>
      <div className="links">
        {categories.map((category) => (
          <NavLink to={`products/${category}`} key={category}>
            {category}
          </NavLink>
        ))}
        <NavLink to="products/offers" className="offers">
          OFERTAS
        </NavLink>
      </div>
      <Link to="search" className="searchWidget">
        <i className="fas fa-search"></i>
      </Link>
      <Link to="cart" className="cartWidget">
        <CartWidget />
      </Link>
    </div>
  );
};

export default NavBar;
