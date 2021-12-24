import React from 'react'
import Item from './Item'
import { useEffect, useState } from 'react'
import data from '../assets/json/products.json'

const ItemList = () => {
    const [products, setProducts] = useState([])

    const getProducts = () => {
        const promise = new Promise ( (resolved, rejected) => {
            setTimeout(() => {
                resolved(data)
                rejected('La obtención de datos falló.')
            }, 2000);
        })
        promise
            .then(resolved => setProducts(resolved))
            .catch(rejected => alert(rejected))
    
    }

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <div className='list'>
            {products.map( e => 
                <Item product={e} key={e.id}/>
            )}
        </div>
    )
}


export default ItemList
