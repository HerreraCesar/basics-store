import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import db from '../services/firebase'
import Loader from './Loader'
import ItemDetail from './ItemDetail'


const ItemDetailContainer = () => {
    const [isLoading, setLoading] = useState(true);
    const [product, setProduct] = useState([])
    const {productId} = useParams();
    
    useEffect( () => {
        
        const reference = doc (db, 'products', productId)

        getDoc(reference).then( querySnapshot => {
            setProduct({...querySnapshot.data(), id: querySnapshot.id})
            setLoading (false);
        } )

    }, [productId])

    return (
        <div className='detailContainer'>
            {isLoading ? <Loader/> : <ItemDetail product={product}/>}
        </div>
    )
}

export default ItemDetailContainer
