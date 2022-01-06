
import './assets/scss/styles.scss'
import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home';
import Cart from './components/Cart';


function App() {

  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path="" element={<Home/>}/>
        <Route path="cart" element={<Cart/>}/>
        <Route path="products" element={<ItemListContainer />} />
        <Route path="products/:categoryId" element={<ItemListContainer />} />
        <Route path="products/details/:productId" element={<ItemDetailContainer />} />
        <Route path="products/almacen/details/:productId" element={<ItemDetailContainer />} />
        <Route path="products/limpieza/details/:productId" element={<ItemDetailContainer />} />
        <Route path="products/bebidas/details/:productId" element={<ItemDetailContainer />} />
      </Routes>
    </Router>
  )
}

export default App;
