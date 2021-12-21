import React from 'react';
import { useState } from 'react';

const ItemCount = ({stock}) => {
    const [quantity, setQuantity] = useState(1);
    function modifyAmount(e) {
        if (e.target.id === 'increase') {
            if (quantity >= stock) {
                alert('No hay más productos')
            }
            else {
                setQuantity(quantity+1)
            }
        }
        else if (e.target.id === 'decrease') {
            if (quantity <= 1) {
                alert('La cantida no puede ser menor a uno.')
            }
            else {
                setQuantity(quantity-1)
            }
        }
    }
    return (
        <div className='amount'>
            <p className='stock'>Stock: {stock-quantity}</p>
            <div className='controls'>
                <button onClick={modifyAmount} id='decrease'>-</button>
                <span>{quantity}</span>
                <button onClick={modifyAmount} id='increase'>+</button>
            </div>
            <button className='addCart'>Agregar</button>
        </div>
    )
}

export default ItemCount
