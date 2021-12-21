import React from 'react'
import ItemCount from './ItemCount'

const ItemListContainer = (props) => {
    return (
        <>
            <div className='section'>Sección {props.id}</div>
            <ItemCount stock='5'/>
        </>
    )
}

export default ItemListContainer
