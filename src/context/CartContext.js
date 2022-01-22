import { createContext, useState } from "react";

export const CartContext = createContext({
    cart: []
});



export function CartContextProvider({children}) {

    const [cart, setCart] = useState([]);
    const [active, setActive] = useState (false)
    const [message, setMessage] = useState ('')

    function addToCart(product) {
        setCart ( (existing) => {
            return existing.concat(product)
        })
    }

    function removeFromCart(product) {
        setCart ( (existing) => {
            return existing.filter ( p => p.id !== product.id)
        })
    }

    function productIsInCart(product) {
        return cart.some ( p => p.id === product.id)
    }

    function clearCart() {
        setCart([])
    }

    function moreQuantity(product) {
        const position = cart.findIndex(p => p.id === product.id)
        cart[position].quantity = parseInt(cart[position].quantity) + 1
        setCart(cart.concat([]))
    }

    function lessQuantity(product) {
        const position = cart.findIndex(p => p.id === product.id)
        cart[position].quantity = parseInt(cart[position].quantity) - 1
        setCart(cart.concat([]))
    }

    function changeMessage(newMessage) {
        setMessage(newMessage)
        setActive(true)
        setTimeout(() => {
            setActive(false)
        }, 3000);
    }

    const context = {
        cart: cart,
        total: cart.length,
        addToCart: addToCart,
        removeFromCart: removeFromCart,
        productIsInCart: productIsInCart,
        clearCart: clearCart,
        moreQuantity:moreQuantity,
        lessQuantity:lessQuantity,
        active:active,
        message:message,
        changeMessage:changeMessage
    }

    return (
        <CartContext.Provider value={context}>
            {children}
        </CartContext.Provider>
    )

}