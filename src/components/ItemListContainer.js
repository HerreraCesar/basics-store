import React from 'react'
import ItemList from './ItemList'
import data from '../assets/json/products.json'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loader from './Loader'


const ItemListContainer = () => {
    const [products, setProducts] = useState([])
    const [isLoading, setLoading] = useState(false);
    const {categoryId} = useParams();
    
    useEffect(() => {
        setLoading (true);
        const promise = new Promise ( (resolved, rejected) => {
            setTimeout(() => {
                setLoading(false)
                resolved(data)
                rejected('La obtención de datos falló.')
            }, 2000);
        })
        promise
            .then(resolved => {
                if (categoryId !== undefined) {
                    const filteredProducts = resolved.filter( (product) => product.category.toLowerCase() === categoryId)
                    setProducts(filteredProducts)
                }
                else {
                    setProducts(resolved)
                }
            })
            .catch(rejected => alert(rejected))
    }, [categoryId])
    

    return (
        <div className='box'>
            {isLoading ? <Loader/> : <ItemList products={products}/>}
        </div>
    )
}

export default ItemListContainer
