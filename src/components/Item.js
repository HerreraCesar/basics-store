import React from 'react'
import ItemCount from './ItemCount'

const Item = ({product}) => {
    return (
        <div className='product'>
            <img className='photo' src={product.photo} alt={product.name}/>
            <h2 className='name'>{product.name}</h2>
            <span className='price'>$ {product.price}</span>
            <ItemCount stock={product.stock}/>
        </div>
    )
}

export default Item
