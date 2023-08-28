import { Fragment} from "react";
import { Outlet } from "react-router-dom";
import { ReactComponent as CrownLogo } from "../../assets/crown.svg";
import {
  NavigationContainer,
  LogoContainer,
  NavLinks,
  NavbarLinks,
} from "./navigation.styles.jsx";
import { useSelector } from "react-redux";
// import { UserContext } from "../../context/user.context.component";
import { signOutUser } from "../../utils/firebase.utlis";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
// import { CartContext } from "../../context/cart.context";
import { selectCurrentUser } from "../../store/user/user.selectors";
import { selectIsCartOpen } from "../../store/cart/cart.selector";

const Navigation = () => {
  // const { currentUser } = useContext(UserContext);
  const currentUser = useSelector(selectCurrentUser);
  // const { isCartOpen } = useContext(CartContext);
  const isCartOpen = useSelector(selectIsCartOpen);

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <div className="logo-container">{<CrownLogo />}</div>
        </LogoContainer>
        <NavLinks>
          <NavbarLinks to="/shop">SHOP</NavbarLinks>
          {currentUser ? (
            <NavbarLinks as="span" onClick={signOutUser}>
              SIGN OUT
            </NavbarLinks>
          ) : (
            <NavbarLinks to="/auth">SIGN IN</NavbarLinks>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
