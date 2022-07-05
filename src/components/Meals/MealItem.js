import { useContext } from 'react';
import './MealItem.css';
import MealForm from './MealForm';
import CartContext from '../../store/context';

function MealItem(props){
     
    // const newPrice = `${props.price.toFixed(2)}`;
    // const newPrice = `${props.price.toFixed(2)}`;
    const cartCtx = useContext(CartContext);

    function AddToCartHandler(amount){
        cartCtx.addItem({
            id:props.id,
            name:props.name,
            amount:amount,
            price:props.price
        })
    };

    return(
        <li className="meal">
            <div>
                <h3>{props.name}</h3>
                <div className="description">{props.description}</div>
                <div className="price">₹{props.price}</div>
            </div>
            <div>
                <MealForm onAddToCart={AddToCartHandler} />
            </div>
        </li>
    );
};

export default MealItem;