import React from 'react'
import ItemList from './ItemList'
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

        const myProducts = categoryId ?
        query(collection(db,'products'), where('category', '==', categoryId), orderBy('price'))
        :
        query(collection(db,'products'), orderBy('price'));

        const querySnapshot = await getDocs(myProducts)

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
