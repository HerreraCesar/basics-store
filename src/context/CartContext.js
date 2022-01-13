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

    const context = {
        cart: cart,
        total: cart.length,
        addToCart: addToCart,
        removeFromCart: removeFromCart,
        productIsInCart: productIsInCart,
        clearCart: clearCart
    }

    return (
        <CartContext.Provider value={context}>
            {children}
        </CartContext.Provider>
    )

}