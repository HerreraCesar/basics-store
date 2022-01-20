import './assets/scss/styles.scss'
import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home';
import Cart from './components/Cart';
import { CartContextProvider } from './context/CartContext';
import Checkout from './components/Checkout';
import db from './services/firebase';
/* import data from './assets/json/products.json'; */
import {addDoc, collection} from 'firebase/firestore';

function App() {

  /* const arrayUpload = () => {
    data.forEach(element => {
      addDoc(collection(db, 'products'), element )
    });
  } */

  return (
    <CartContextProvider>
      <Router>
        <NavBar/>
        {/* <button className='subir' onClick={arrayUpload}>subir cosas</button> */}
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
