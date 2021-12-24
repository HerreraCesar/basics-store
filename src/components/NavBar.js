import React from 'react'
import CartWidget from './CartWidget'

const NavBar = () => {
    return (
        <div className='NavBar'>
            <div className='logo'>
                <span>E-COMMERCE HERRERA</span>
            </div>
            <div className='links'>
                <a href='index.html'>Inicio</a>
                <a href='index.html'>Productos</a>
                <a href='index.html'>Contacto</a>
                <a href='index.html'>Mi cuenta</a>
            </div>
            <CartWidget/>
        </div>
    )
}

export default NavBar
