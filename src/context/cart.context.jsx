import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
  const haveCartItem = cartItems.find((elem) => elem.id === productToAdd.id);

  if (haveCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, productToRemove) => {
  const haveCartItem = cartItems.find((elem) => elem.id === productToRemove.id);

  if (haveCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
  }

  if (haveCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
  }
};


const clearCartItem = (cartItems,productToClear) =>{
  return cartItems.filter((cartItem) => cartItem.id !== productToClear.id)
}


export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemToCart: () => {},
  clearItemFromCart : () => {},
  cartCount: 0,
  cartTotal:0,
});

const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal,setCartTotal] = useState(0);

  useEffect(() => {
    let newCartCount = cartItems.reduce((acc, elem) => {
      return acc + elem.quantity;
    }, 0);
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    let newCartCount = cartItems.reduce((acc, elem) => {
      return acc + elem.quantity* elem.price;
    }, 0);
    setCartTotal(newCartCount);
  }, [cartItems]);

  const addItemToCart = (productToAdd) =>
    setCartItems(addCartItem(cartItems, productToAdd));

  const removeItemToCart = (productToRemove) =>
    setCartItems(removeCartItem(cartItems, productToRemove));


  const clearItemFromCart = (productToClear) =>{
    setCartItems(clearCartItem(cartItems, productToClear));
  }  

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartCount,
    removeItemToCart,
    clearItemFromCart,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
