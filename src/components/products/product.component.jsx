import Button from '../button/button.component';
import './product.styles.scss';
import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';


const ProductCard = ({product}) =>{
    const {name,imageUrl,price} = product;
    const {addItemToCart} = useContext(CartContext)

    const handleAddToCart = () => addItemToCart(product)

    return (
        <div className='product-card-container'>
            <img src={imageUrl} alt={name}/>
            <div className='footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>
            <Button buttonType="inverted" onClick={handleAddToCart}>Add To Cart</Button>
        </div>
    )
}

export default ProductCard