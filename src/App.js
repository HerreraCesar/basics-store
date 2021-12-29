import './App.css';
import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer';

import { BrowserRouter, Switch, Route } from 'react-router-dom'


function App() {
  return (
    <BrowserRouter>
      <NavBar/>
      <ItemListContainer className='sections'/>
      <ItemDetailContainer/>
    </BrowserRouter>
  )
}

export default App;
