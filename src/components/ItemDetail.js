import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import ItemCount from './ItemCount'

const ItemDetail = ({product}) => {
    const [added, setAdded] = useState (false)
    const [coordinates, setCoordinates] = useState ({})
    const [zoom, setZoom] = useState (false)
    const {addToCart, productIsInCart} = useContext(CartContext)

    function onAdd(props) {
        product.quantity = parseInt(props.target.value);
        if (productIsInCart(product) === true) {
        }
        else {
            addToCart(product)
        }
        setAdded(true)
    }

    function Magnifying () {
        setZoom (true)
    }

    function Normalize () {
        setZoom (false)
        setCoordinates ({x:50, y:50, z:1})
    }
    
    function Zooming (event) {
        
        let frame = document.getElementById ('frame');
        let clientX = event.clientX - frame.offsetLeft
        let clientY = event.clientY - frame.offsetTop

        let mWidth = frame.offsetWidth
        let mHeight = frame.offsetHeight

        clientX = clientX / mWidth * 100
        clientY = clientY / mHeight * 100
        setCoordinates ({x: clientX, y:clientY, z: 1.25 })
    }

    const styles = { 
        transform: `translate(-${coordinates.x}%, -${coordinates.y}%) scale(${coordinates.z})`
    };
    
    return (
        <div className='detail'>
            <div  id='frame' className='frame' onMouseEnter={Magnifying} onMouseLeave={Normalize} onMouseMove={Zooming}>
                <img style={styles} className= {zoom ? 'zoom' : 'image'} src={product.photo} alt={product.name} />
            </div>
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
                    <button className='button' onClick={ () => window.history.back()}>Volver</button>
                </div>
                :
                <ItemCount onAdd={onAdd} stock={product.stock}/>
                }
            </div>
        </div>
    )
}

export default ItemDetail
