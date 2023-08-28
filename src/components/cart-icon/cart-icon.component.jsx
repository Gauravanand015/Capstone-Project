import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { useDispatch,useSelector } from "react-redux";
import { selectCartCount } from "../../store/cart/cart.selector";
import { setIsCartOpen } from "../../store/cart/cart.action";
import { selectIsCartOpen } from "../../store/cart/cart.selector";
import {CartIconContainer,ItemCount} from  "./cart-icon.styles.jsx";
// import { useContext } from "react";
// import { CartContext } from "../../context/cart.context";


const CartIcon = () => {
  // const { isCartOpen, setIsCartOpen,cartCount } = useContext(CartContext);
  const dispatch = useDispatch();
  const cartCount = useSelector(selectCartCount);
  const isCartOpen = useSelector(selectIsCartOpen);
  const handleCartDropDown = () => dispatch(setIsCartOpen(!isCartOpen));

  return (
    <CartIconContainer onClick={handleCartDropDown}>
      <ShoppingIcon className="shopping-icon" />
      <ItemCount className="item-count">{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
