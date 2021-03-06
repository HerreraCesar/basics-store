import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CartContext } from "./context/CartContext";
import { useContext } from "react";
import NavBar from "./components/navbar/NavBar";
import Home from "./components/home/Home";
import Cart from "./components/cart/Cart";
import ItemListContainer from "./components/containers/ItemListContainer";
import ItemDetailContainer from "./components/containers/ItemDetailContainer";
import Checkout from "./components/cart/Checkout";
import Message from "./components/message/Message";
import Search from "./components/navbar/Search";
import Footer from "./components/footer/Footer";

function App() {
  const { active, message } = useContext(CartContext);

  return (
    <Router>
      <NavBar />
      {active ? <Message message={message} /> : ""}
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="products" element={<ItemListContainer />} />
        <Route path="products/:categoryId" element={<ItemListContainer />} />
        <Route
          path="products/details/:productId"
          element={<ItemDetailContainer />}
        />
        <Route path="checkout" element={<Checkout />} />
        <Route path="search" element={<Search />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
