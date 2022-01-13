import React from 'react'
import { useContext } from 'react'
import { CartContext } from '../context/CartContext'


const Cart = () => {

    const {cart} = useContext(CartContext)
    console.log(cart);
    return (
        <div className='home'>
            <h1>Cart</h1>
            {cart.map(p => 
                <h4 style={{color:'black',margin: 'auto'}} key={p.id}>{p.name}</h4>
            )}
        </div>
    )
}

export default Cart
