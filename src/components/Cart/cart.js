import React, { useContext, useState } from 'react';

import Modal from '../UI/modal';
// import CartItem from './CartItem';
import './cart.css';
import CartContext from '../../store/context';
import CartItem from './cartItem';
import Checkout from './checkout';
import Success from '../../assets/success.png';
// import './App.css';

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [isCheckout, setisCheckout] = useState(false);
  const [isSubmitting, setisSubmitting] = useState(false);
  const [isSubmitted, setisSubmitted] = useState(false);
  const [isError, setIsError] = useState('');

  // const totalAmount = `$${cartCtx.amount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  
  function removeHandler(id){
    cartCtx.removeItem(id);
  }
  function addHandler(item){
    cartCtx.addItem({...item,amount:1});
  }

  async function submitOrder(userData){
    setisSubmitting(true);
    try{
    const response = await fetch('https://food-delivery-74320-default-rtdb.firebaseio.com/data.json' , {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orders: cartCtx.items
      })
    })
    if (!response.ok) {
      throw new Error('Sorry, Unable to Order Please Try again');
    }
    setisSubmitting(false);
    setisSubmitted(true);
    cartCtx.clearCart();
    }catch(error){
      setIsError(error.message);
      setisSubmitting(false);
    }
  }

  const cartItems = (
    <ul className='cart-items'>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={removeHandler.bind(null,item.id)}
          onAdd={addHandler.bind(null,item)}
        />
      ))}
    </ul>
  );


  function orderHandler(){
    setisCheckout(true);
  }

  const modalAction = (<div className="actions">
  <button className='btn' onClick={props.onHide}>
    Close
  </button>
  {hasItems && <button className="buttons" onClick={orderHandler}>Order</button>}
 </div>
  );

  const totalAmount = `₹${cartCtx.amount.toFixed(2)}`;

  const cardModal = <React.Fragment>
    {cartItems}
      <div className="total">
        <span>Total amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <Checkout onConfirm={submitOrder} onCancel={props.onHide}/>}
      {!isCheckout && modalAction }
  </React.Fragment>

  const submitting = <p style={{textAlign:'center'}}>Sit Tight, confirming your Order</p>

  const submitted =<div> <span><p style={{fontWeight:'650' , fontFamily:'cursive' , color:'#3F3F3F', textAlign:'center',fontSize:'1.5rem', float:'left', marginLeft:'29px'}}> Yayy, Order received Successfully</p> </span>
  <span><img className="successImg" src={Success} alt=""></img></span>
   <div className="actions"><button className="buttons"  onClick={props.onHide}>Close</button> 
  </div></div>

  return (
    <Modal onClick={props.onHide}>
      {!isSubmitting && !isSubmitted && !isError && cardModal}
      {isSubmitting && !isSubmitted && submitting}
      {isSubmitted && !isSubmitting && submitted}
      {isError && isError}
    </Modal>
  );
};

export default Cart;