import './assets/scss/styles.scss'
import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home';
import Cart from './components/Cart';
import { CartContextProvider } from './context/CartContext';
import Checkout from './components/Checkout';



function App() {
  return (
    <CartContextProvider>
      <Router>
        <NavBar/>
        <Routes>
          <Route path="" element={<Home/>}/>
          <Route path="cart" element={<Cart/>}/>
          <Route path="products" element={<ItemListContainer />} />
          <Route path="products/:categoryId" element={<ItemListContainer />} />
          <Route path="products/details/:productId" element={<ItemDetailContainer />} />
          <Route path="checkout" element={<Checkout/>} />
        </Routes>
      </Router>
    </CartContextProvider>
  )
}

export default App;
