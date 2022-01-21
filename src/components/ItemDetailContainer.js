import React from 'react'
import ItemDetail from './ItemDetail'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Loader from './Loader'
import db from '../services/firebase'
import { doc, getDoc } from 'firebase/firestore'


const ItemDetailContainer = () => {
    const [product, setProduct] = useState([])
    const {productId} = useParams();
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {

        setLoading (true);
        
        const reference = doc(db, 'products', productId)

        getDoc(reference).then( querySnapshot => {
            setProduct({...querySnapshot.data(), id: querySnapshot.id})
        } )

        setLoading (false);

    }, [productId])

    return (
        <div className='detailContainer'>
            {isLoading ? <Loader/> : <ItemDetail product={product}/>}
        </div>
    )
}

export default ItemDetailContainer
