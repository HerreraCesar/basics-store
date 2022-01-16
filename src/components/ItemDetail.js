import React from 'react'
import ItemCount from './ItemCount'
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const ItemDetail = ({product}) => {
    const [added, setAdded] = useState (false)

    const {addToCart, productIsInCart} = useContext(CartContext)

    function onAdd(props) {
        product.quantity = parseInt(props.target.value);
        if (productIsInCart(product) === true) {
            console.log('El producto ya se encuentra en el carrito');
        }
        else {
            addToCart(product)
        }
        setAdded(true)
    }
    return (
        <div className='detail'>
            <img className='photo' src={product.photo} alt={product.name}/>
            <div className='data'>
                <div>
                    <p className='code'>{product.sku}</p>
                    <h2 className='name'>{product.name}</h2>
                    <span className='price'>$ {product.price}</span>
                </div>
                {added === true || productIsInCart(product) === true
                ?
                <div className='buttonsContainer'>
                    <Link to="/cart"><button className='button'>Ir al carrito</button></Link>
                    <Link to="/products"><button className='button'>Volver</button></Link>
                </div>
                :
                <ItemCount onAdd={onAdd} stock={product.stock}/>
                }
            </div>
        </div>
    )
}

export default ItemDetail
