import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { 
    CheckoutItemContainer,
    ImageContainer,
    BaseSpan,
    Quantity,
    Arrow,
    Value,
    RemoveButton,
} from './checkout-item.styles';

const CheckoutItem  = (props) => {
    const { name, imageUrl, price, quantity } = props.cartItem;
    const { clearItemFromCart, addItemToCart, removeItemFromCart } = useContext(CartContext);
    const clearItemHandler = () => clearItemFromCart(props.cartItem);
    const addItemHandler = () => addItemToCart(props.cartItem);
    const removeItemHandler = () => removeItemFromCart(props.cartItem);

    return(
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={name}/>
            </ImageContainer>
            <BaseSpan>{name}</BaseSpan>
            <Quantity>
                <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
                <Value>{quantity}</Value>
                <Arrow onClick={addItemHandler}>&#10095;</Arrow>
            </Quantity>
            <BaseSpan>{price}</BaseSpan>
            <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    )
}

export default CheckoutItem;