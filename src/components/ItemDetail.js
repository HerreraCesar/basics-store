import React from 'react'
import ItemCount from './ItemCount'

const ItemDetail = ({product}) => {
    return (
        <>
            <img className='photo' src={product.photo} alt={product.name}/>
            <div className='data'>
                <p className='code'>{product.sku}</p>
                <h2 className='name'>{product.name}</h2>
                <span className='price'>$ {product.price}</span>
                <ItemCount stock={product.stock}/>
            </div>
        </>
    )
}

export default ItemDetail
