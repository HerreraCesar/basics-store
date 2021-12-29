import React from 'react'
import ItemDetail from './ItemDetail'
import data from '../assets/json/products.json'

import { useEffect, useState } from 'react'


const ItemDetailContainer = () => {
    const [product, setProduct] = useState([])

    const getProduct = () => {
        const promise = new Promise ( (resolved, rejected) => {
            setTimeout(() => {
                resolved(data[0])
                rejected('La obtención de datos falló.')
            }, 2000);
        })
        promise
            .then(resolved => setProduct(resolved))
            .catch(rejected => alert(rejected))
    }

    useEffect(() => {
        getProduct()
    }, [])

    return (
        <div className='detailContainer'>
            <ItemDetail product={product}/>
        </div>
    )
}

export default ItemDetailContainer
