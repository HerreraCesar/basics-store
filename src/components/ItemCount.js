import React from 'react';
import { useState } from 'react';

const ItemCount = ({stock,onAdd}) => {

    const [quantity, setQuantity] = useState(1);

    function modifyAmount(e) {
        if (e.target.id === 'increase') {
            setQuantity(quantity+1)
        }
        else if (e.target.id === 'decrease') {
            setQuantity(quantity-1)
        }
    }

    return (
        <div className='amount'>
            <p className='stock'>Stock: {stock}</p>
            <div className='controls'>
                {quantity <= 1 ? "" : <button onClick={modifyAmount} id='decrease'>-</button>}
                <span>{quantity}</span>
                {quantity >= stock ? "" : <button onClick={modifyAmount} id='increase'>+</button>}
            </div>
            <button className='addCart' value={quantity} onClick={onAdd}>Agregar al carrito</button>
        </div>
    )
}

export default ItemCount
