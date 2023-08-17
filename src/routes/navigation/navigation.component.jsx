import { Fragment, useContext } from "react";
import { Outlet } from "react-router-dom";
import { ReactComponent as CrownLogo } from "../../assets/crown.svg";
import {
  NavigationContainer,
  LogoContainer,
  NavLinks,
  NavbarLinks,
} from "./navigation.styles.jsx";
import { UserContext } from "../../context/user.context.component";
import { signOutUser } from "../../utils/firebase.utlis";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../context/cart.context";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);
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
