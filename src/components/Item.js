import React from 'react'
import { Link } from 'react-router-dom'

const Item = ({product}) => {
    return (
        <Link className='product' to={`/products/details/${product.id}`}>
            {product.offer?
            <span className='offer'>oferta!</span>
            : ''}
            <img className='photo' src={product.photo} alt={product.name}/>
            <h2 className='name'>{product.name}</h2>
            <span className='price'>$ {product.price}</span>
        </Link>
    )
}

export default Item
