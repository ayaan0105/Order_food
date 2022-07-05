import { useReducer } from "react";
import CartContext from "./context";

const initialState = {
    items:[],
    amount: 0   
};

function reducer(state, action) {
    if (action.type === "ADD") {
            // const updatedItems = state.items.concat(action.item);
            const updatedamount = state.amount + action.item.price * action.item.amount;

              const cartItemsIndex = state.items.findIndex((item) => (item.id === action.item.id));
              const cartItems = state.items[cartItemsIndex];
              
              let updated;

              if (cartItems) {
                let updatedlist;
                updatedlist={
                  ...cartItems,
                  amount:cartItems.amount + action.item.amount
                };
                updated = [...state.items];
                updated[cartItemsIndex]=updatedlist;  
              }else{
                // updatedlist={...action.item}
                updated=state.items.concat(action.item);
              }
            return {
                items:updated,
                amount:updatedamount
            };
    }
    if (action.type === 'REMOVE') {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.id
      );
      const existingItem = state.items[existingCartItemIndex];
      const updatedTotalAmount = state.amount - existingItem.price;
      let updatedItems;
      if (existingItem.amount === 1) {
        updatedItems = state.items.filter(item => item.id !== action.id);
      } else {
        const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      }
  
      return {
        items: updatedItems,
        amount: updatedTotalAmount
      };
    }
    if (action.type === 'CLEAR') {
      return initialState;
    }
  return initialState;
}

function CartProv(props) {
  const [cartState, dispatch] = useReducer(reducer, initialState);

  function addItemHandler(item) {
    dispatch({ type: "ADD", item: item });
  }

  function removeItemHandler(id) {
    dispatch({ type: "REMOVE", id: id });
  }
  function clearHAndler(){
    dispatch({type: 'CLEAR'})
  }

  const thisContext = {
    items: cartState.items,
    amount: cartState.amount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    clearCart: clearHAndler
  };
  return (
    <CartContext.Provider value={thisContext}>
      {props.children}
    </CartContext.Provider>
  );
}

export default CartProv;
