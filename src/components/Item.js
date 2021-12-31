import React from 'react'
import { Link } from 'react-router-dom'

const Item = ({product}) => {
    return (
        <Link className='product' to={`details/${product.id}`}>
            <img className='photo' src={product.photo} alt={product.name}/>
            <h2 className='name'>{product.name}</h2>
            <span className='price'>$ {product.price}</span>
        </Link>
    )
}

export default Item
