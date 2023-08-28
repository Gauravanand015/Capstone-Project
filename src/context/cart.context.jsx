import { createContext, useReducer, useState } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

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

const clearCartItem = (cartItems, productToClear) => {
  return cartItems.filter((cartItem) => cartItem.id !== productToClear.id);
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemToCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

const CART_ACTION_TYPE = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
};

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_CART_ITEMS":
      return {
        ...state,
        ...payload,
      };
    default:
      throw new Error(`Unhandled Type ${type} in cart reducer`);
  }
};

const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  // const [cartItems, setCartItems] = useState([]);
  // const [cartCount, setCartCount] = useState(0);
  // const [cartTotal,setCartTotal] = useState(0);

  const [{ cartItems, cartCount, cartTotal }, dispatch] = useReducer(
    cartReducer,
    INITIAL_STATE
  );

  const updateCartItemReducer = (cartItems) => {
    let newCartCount = cartItems.reduce((acc, elem) => {
      return acc + elem.quantity;
    }, 0);

    let newCartTotal = cartItems.reduce((acc, elem) => {
      return acc + elem.quantity * elem.price;
    }, 0);

    const payload = {
      cartItems,
      cartCount: newCartCount,
      cartTotal: newCartTotal,
    };

    dispatch(createAction(CART_ACTION_TYPE.SET_CART_ITEMS, payload));
  };

  // useEffect(() => {
  //   let newCartCount = cartItems.reduce((acc, elem) => {
  //     return acc + elem.quantity;
  //   }, 0);
  //   setCartCount(newCartCount);
  // }, [cartItems]);

  // useEffect(() => {
  //   let newCartTotal = cartItems.reduce((acc, elem) => {
  //     return acc + elem.quantity* elem.price;
  //   }, 0);
  //   setCartTotal(newCartTotal);
  // }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemReducer(newCartItems);
  };

  const removeItemToCart = (productToRemove) => {
    const newCartItems = removeCartItem(cartItems, productToRemove);
    updateCartItemReducer(newCartItems);
  };

  const clearItemFromCart = (productToClear) => {
    const newCartItems = clearCartItem(cartItems, productToClear);
    updateCartItemReducer(newCartItems);
  };

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
