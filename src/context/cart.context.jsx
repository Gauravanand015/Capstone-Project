import { createContext, useState } from "react";

export const CartContext = createContext({
    isCartOpen:false,
    setIsCartOpen : ()=>{}
})

const CartProvider = ({children}) =>{
    console.log("children",children)
    const [isCartOpen,setIsCartOpen] = useState(false);
    const value = {isCartOpen,setIsCartOpen}

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export default CartProvider