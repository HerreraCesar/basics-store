import React from 'react'
import ItemDetail from './ItemDetail'
/* import data from '../assets/json/products.json' */
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Loader from './Loader'
import db from '../services/firebase'
import { doc, getDoc, QuerySnapshot } from 'firebase/firestore'


const ItemDetailContainer = () => {
    const [product, setProduct] = useState([])
    const {productId} = useParams();
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading (true);
        /* const promise = new Promise ( (resolved, rejected) => {
            setTimeout(() => {
                setLoading(false)
                resolved(data)
                rejected('La obtención de datos falló.')
            }, 500);
        })
        promise
            .then(resolved => {
                if (productId !== undefined) {
                    const filteredProduct = resolved.find( (product) => product.id === productId)
                    setProduct(filteredProduct)
                }
                else {
                    setProduct(resolved)
                }
            })
            .catch(rejected => alert(rejected)) */

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
