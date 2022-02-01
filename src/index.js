import React from "react";
import ReactDOM from "react-dom";
import "./styles.scss";
import 'animate.css';
import App from "./App";
import { CartContextProvider } from "./context/CartContext";

ReactDOM.render(
  <React.StrictMode>
    <CartContextProvider>
      <App />
    </CartContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);