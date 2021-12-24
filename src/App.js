import './App.css';
import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';

function App() {
  return (
    <div>
      <NavBar/>
      <div className='sections'>
        <ItemListContainer/>
      </div>
    </div>
  )
}

export default App;
