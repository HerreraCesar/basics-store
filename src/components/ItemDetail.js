import React from 'react'
import ItemCount from './ItemCount'
import { useState } from 'react';
import { Link } from 'react-router-dom';

const ItemDetail = ({product}) => {
    const [added, setAdded] = useState (false)

    function onAdd() {
        setAdded(true)
        console.log(added);
    }
    return (
        <>
            <img className='photo' src={product.photo} alt={product.name}/>
            <div className='data'>
                <p className='code'>{product.sku}</p>
                <h2 className='name'>{product.name}</h2>
                <span className='price'>$ {product.price}</span>
                {added == false ?
                <ItemCount onAdd={onAdd} stock={product.stock}/>
                :<div className='buttonsContainer'>
                    <Link to="/cart"><button className='button'>Ir al carrito</button></Link>
                    <Link to="/products"><button className='button'>Volver</button></Link>
                </div>}
            </div>
        </>
    )
}

export default ItemDetail
