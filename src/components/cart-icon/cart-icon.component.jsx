import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import {CartIconContainer,ItemCount} from  "./cart-icon.styles.jsx";
import { useContext } from "react";
import { CartContext } from "../../context/cart.context";


const CartIcon = () => {
  const { isCartOpen, setIsCartOpen,cartCount } = useContext(CartContext);
 
  const handleCartDropDown = () => setIsCartOpen(!isCartOpen);

  return (
    <CartIconContainer onClick={handleCartDropDown}>
      <ShoppingIcon className="shopping-icon" />
      <ItemCount className="item-count">{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
