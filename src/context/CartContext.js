import { createContext, useState } from "react";

export const CartContext = createContext({
    cart: []
});

export function CartContextProvider({children}) {

    const [cart, setCart] = useState([]);

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

    const context = {
        cart: cart,
        total: cart.length,
        addToCart: addToCart,
        removeFromCart: removeFromCart,
        productIsInCart: productIsInCart,
        clearCart: clearCart,
        moreQuantity:moreQuantity,
        lessQuantity:lessQuantity
    }

    return (
        <CartContext.Provider value={context}>
            {children}
        </CartContext.Provider>
    )

}