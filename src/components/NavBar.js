import React from 'react'
import CartWidget from './CartWidget'

const NavBar = () => {
    return (
        <div className='NavBar'>
            <div className='logo'>
                <span>E-COMMERCE HERRERA</span>
            </div>
            <div className='links'>
                <a href='#'>Inicio</a>
                <a href='#'>Productos</a>
                <a href='#'>Contacto</a>
                <a href='#'>Mi cuenta</a>
            </div>
            <CartWidget/>
        </div>
    )
}

export default NavBar
