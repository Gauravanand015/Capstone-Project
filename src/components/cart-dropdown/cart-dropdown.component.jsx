import Button from '../button/button.component'
import './cart-dropdown.styles.scss'
import { useContext } from 'react'
import { CartContext } from '../../context/cart.context' 
import CartItem from '../cart-item/cart-item.component'
import { useNavigate } from 'react-router-dom'


const CartDropdown = () =>{

    const {cartItems} = useContext(CartContext)
    const navigate = useNavigate();

    const goToCheckoutPage = () =>{
        navigate("/checkout")
    }

    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {cartItems.map((elem) => <CartItem key={elem.id} cartItem={elem}/>)}
            </div>
            <Button onClick = {goToCheckoutPage}>Go to Cart</Button>
        </div>
    )
}

export default CartDropdown