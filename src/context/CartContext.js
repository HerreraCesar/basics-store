import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({
  cart: [],
});

export function CartContextProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const localData = localStorage.getItem("cart");
    return localData ? JSON.parse(localData) : [];
  });
  const [purchase, setPurchase] = useState(() => {
    const localData = localStorage.getItem("purchase");
    return localData ? JSON.parse(localData) : 0;
  });
  const [active, setActive] = useState(false);
  const [message, setMessage] = useState("");
  const [order, setOrder] = useState({ type: "price", direction: "asc" });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  useEffect(() => {
    localStorage.setItem("purchase", JSON.stringify(purchase));
  }, [purchase]);

  function addToCart(product) {
    setCart((existing) => {
      return existing.concat(product);
    });
  }

  function removeFromCart(product) {
    setCart((existing) => {
      return existing.filter((p) => p.id !== product.id);
    });
  }

  function productIsInCart(product) {
    return cart.some((p) => p.id === product.id);
  }

  function clearCart() {
    setCart([]);
  }

  function moreQuantity(product) {
    const position = cart.findIndex((p) => p.id === product.id);
    cart[position].quantity = parseInt(cart[position].quantity) + 1;
    setCart(cart.concat([]));
  }

  function lessQuantity(product) {
    const position = cart.findIndex((p) => p.id === product.id);
    cart[position].quantity = parseInt(cart[position].quantity) - 1;
    setCart(cart.concat([]));
  }

  function addTotal(total) {
    setPurchase({
      total: total,
    });
  }

  function clearPurchase() {
    setPurchase(0);
  }

  function changeMessage(newMessage) {
    setMessage(newMessage);
    setActive(true);
    setTimeout(() => {
      setActive(false);
    }, 3000);
  }

  function applyFilter(e) {
    switch (e) {
      case "priceUp":
        setOrder({ type: "price", direction: "asc" });
        break;

      case "priceDown":
        setOrder({ type: "price", direction: "desc" });
        break;

      case "nameUp":
        setOrder({ type: "name", direction: "asc" });
        break;

      case "nameDown":
        setOrder({ type: "name", direction: "desc" });
        break;

      default:
        break;
    }
  }

  const context = {
    cart: cart,
    active: active,
    message: message,
    order: order,
    purchase: purchase,
    addToCart: addToCart,
    removeFromCart: removeFromCart,
    productIsInCart: productIsInCart,
    clearCart: clearCart,
    moreQuantity: moreQuantity,
    lessQuantity: lessQuantity,
    changeMessage: changeMessage,
    applyFilter: applyFilter,
    addTotal: addTotal,
    clearPurchase: clearPurchase,
  };

  return (
    <CartContext.Provider value={context}>{children}</CartContext.Provider>
  );
}
