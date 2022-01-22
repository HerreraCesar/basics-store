import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {getDocs, collection, query, where, orderBy} from 'firebase/firestore';
import db from '../services/firebase';
import ItemList from './ItemList'
import Loader from './Loader'

const ItemListContainer = () => {
    const [products, setProducts] = useState([])
    const [isLoading, setLoading] = useState(true);
    const {categoryId} = useParams();
    
    useEffect( () => {

        const myProducts = categoryId ?
        query(collection(db,'products'), where('category', '==', categoryId), orderBy('price'))
        :
        query(collection(db,'products'), orderBy('price'));

        getDocs(myProducts)
        .then( querySnapshot => {
            setProducts( querySnapshot.docs.map ( e => {
                return {...e.data(), id: e.id}
            }))
            setLoading (false);
        })

    }, [categoryId])
    

    return (
        <div className='box'>
            {isLoading ? <Loader/> : <ItemList products={products}/>}
        </div>
    )
}

export default ItemListContainer
