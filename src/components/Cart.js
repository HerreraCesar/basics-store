import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../context/CartContext'
import Message from './Message'


const Cart = () => {

    const {cart, clearCart, removeFromCart, moreQuantity, lessQuantity, changeMessage} = useContext(CartContext)
    let total = 0;

    if (cart.length !== 0) {
        cart.forEach(product => {
            total += product.quantity*product.price
        });
    }

    return (
        <>
            {cart.length === 0 ?
            <div className='cart'>
                <h1>Su carrito está vacío.</h1>
                <h3>Agregue algunos productos haciendo click 
                    <Link to="/products"><span> aquí</span></Link>
                </h3>
            </div>
            :
            <div className='resumeBox'>
                {cart.map ( product =>
                <div key={product.id} className='cartBox'>
                    <div className='resume'>
                        <img className='photo' src={product.photo} alt={product.name}/>
                        <Link to={`/products/details/${product.id}`}>{product.name}
                            <p>$ {product.price}</p>
                        </Link>
                        {product.quantity <= 1 
                        ?
                        <button newMessage='La cantidad no puede ser inferior a uno' onClick={(event) => {
                            changeMessage(event.target.attributes.newMessage.value)
                        }}>-</button>
                        :
                        <button onClick={() => lessQuantity(product)} id={product.id} className='less'>-</button>}
                        <span className='subQuantity'>{product.quantity}</span>
                        {product.quantity >= product.stock
                        ?
                        <button newMessage='La cantidad no puede superar el stock disponible' onClick={(event) => {
                            changeMessage(event.target.attributes.newMessage.value)
                        }}>+</button> 
                        :
                        <button onClick={() => moreQuantity(product)} id={product.id} className='more'>+</button>}
                        <h2 className='subTotal'>$ {product.price*product.quantity}</h2>
                        <i newMessage='Producto eliminado correctamente'
                           className="fas fa-trash-alt delete" 
                           onClick={(event) => {
                                removeFromCart(product)
                                changeMessage(event.target.attributes.newMessage.value)
                            }}>
                        </i>
                    </div>
                </div>
                )}
                <div className='total'>
                    <div className='order'>
                        <h1>El total de su compra es</h1>
                        <h1>$ {total}</h1>
                    </div>
                    <div className='order'>
                        <button newMessage='Carrito vaciado correctamente'
                                className='button' 
                                onClick={(event) => {
                                    clearCart()
                                    changeMessage(event.target.attributes.newMessage.value)
                                }}
                        >Vaciar carrito</button>
                        <button className='button'>
                            <Link to='/checkout'>Terminar compra</Link>
                        </button>
                    </div>
                </div>
            </div>
            }
        </>
    )
}

export default Cart
