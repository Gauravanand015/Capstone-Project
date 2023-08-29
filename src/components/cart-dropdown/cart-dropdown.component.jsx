import Button from "../button/button.component";
import "./cart-dropdown.styles.jsx";
// import { useContext } from "react";
// import { CartContext } from "../../context/cart.context";
import { useSelector } from "react-redux";

import CartItem from "../cart-item/cart-item.component";
import { useNavigate } from "react-router-dom";
import {
 CartDropdownContainer,
 EmptyMessage,
 CartItems
} from "./cart-dropdown.styles.jsx";
import { selectCartItems } from "../../store/cart/cart.selector";

const CartDropdown = () => {
  // const { cartItems } = useContext(CartContext);
  const cartItems = useSelector(selectCartItems)

  const navigate = useNavigate();

  const goToCheckoutPage = () => {
    navigate("/checkout");
  };

  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>
      <Button onClick={goToCheckoutPage}>Go to Cart</Button>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
