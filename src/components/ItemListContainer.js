import React from 'react'
import ItemList from './ItemList'
/* import data from '../assets/json/products.json' */
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loader from './Loader'
import {getDocs, collection, query, where, orderBy} from 'firebase/firestore';
import db from '../services/firebase';


const ItemListContainer = () => {
    const [products, setProducts] = useState([])
    const [isLoading, setLoading] = useState(false);
    const {categoryId} = useParams();
    
    useEffect( async () => {

        setLoading (true);

        // const promise = new Promise ( (resolved, rejected) => {
        //     setTimeout(() => {
        //         setLoading(false)
        //         resolved(data)
        //         rejected('La obtención de datos falló.')
        //     }, 2000);
        // }).then(resolved => {
        //     if (categoryId !== undefined) {
        //         const filteredProducts = resolved.filter( (product) => product.category.toLowerCase() === categoryId)
        //         setProducts(filteredProducts)
        //     }
        //     else {
        //         setProducts(resolved)
        //     }
        // })
        // .catch(rejected => alert(rejected))

        // const myProducts = await promise
        console.log(categoryId);
        const myProducts = categoryId ?
        query(collection(db,'products'), where('category', '==', categoryId), orderBy('price'))
        :
        query(collection(db,'products'), orderBy('price'));

        const querySnapshot = await getDocs(myProducts)
        console.log(querySnapshot.docs)
        setProducts(querySnapshot.docs.map ( e => {
            return {...e.data(), id: e.id}
        }))

        setLoading(false)

    }, [categoryId])
    

    return (
        <div className='box'>
            {isLoading ? <Loader/> : <ItemList products={products}/>}
        </div>
    )
}

export default ItemListContainer
