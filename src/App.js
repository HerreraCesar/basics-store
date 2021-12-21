import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';

function App() {
  return (
    <div>
      <NavBar/>
      <div className='sections'>
        <ItemListContainer id='1'/>
      </div>
    </div>
  )
}

export default App;
