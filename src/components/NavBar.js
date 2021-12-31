import React from 'react'
import CartWidget from './CartWidget'
import data from '../assets/json/products.json'
import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const NavBar = () => {
    const [categories, setCategories] = useState([])

    const getCategories = () => {
        const promise = new Promise ( (resolved, rejected) => {
            setTimeout(() => {
                resolved(data)
                rejected('La obtención de datos falló.')
            },0);
        })
        promise
            .then(resolved => {
                const filteredCategories = []
                resolved.forEach(product => {
                    if (!filteredCategories.includes(product.category)) {
                        filteredCategories.push(product.category)
                    }
                });
                filteredCategories.sort()
                setCategories(filteredCategories)
            })
            .catch(rejected => alert(rejected))
    }

    useEffect(() => {
        getCategories()
    }, [])

    return (
        <div className='NavBar'>
            <div className='logo'>
                <Link to="">Basics Store</Link>
            </div>
            <div className='links'>
                <NavLink to="products">Todos</NavLink>
                {categories.map( category => <NavLink to={`products/${category.toLowerCase()}`}>{category}</NavLink> )}
            </div>
            <CartWidget/>
        </div>
    )
}

export default NavBar
