import React, { useEffect, useState } from 'react';
import {getDocs, collection, query} from 'firebase/firestore';
import db from '../services/firebase';
import Loader from './Loader';
import ItemList from './ItemList';

const Search = () => {

    const [active, setActive] = useState('')
    const [result, setResult] = useState([])
    const [products, setProducts] = useState([])
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
    
        getDocs(query(collection(db,'products')))
        
        .then(querySnapshot => {

            setProducts (querySnapshot.docs.map ( e => {

                return {...e.data(), id: e.id}

            }))
            setLoading (false);

        })
    
    }, []);

    function getFilteredItems ( /* search */ e,products) {
        /* console.log(products); */
        setResult(products.filter( (product) => product.name.toLowerCase().includes(e.target.value.toLowerCase())))

    }
 


  return(
        <>
            <div className={active === '' ? 'searchBox' : 'searchBoxMin'}>
                {isLoading ? <Loader/> :
                <input placeholder='Search...' className='search' type='text' onKeyUp= { (e) => {
                    setActive(e.target.value)
                    getFilteredItems( e, products)
                }}></input>}
                
            </div>
            <div className='box'>
                
            {active === '' ? '' :<ItemList products={result}/>}

                
            </div>
        </>
    )
}

export default Search;
