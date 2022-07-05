import React, {useState} from 'react';
import Header from './components/Layout/header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/cart';
import CartProv from './store/contextProv';
import './App.css';

function App() {

  const [showModal, setshowModal] = useState(false);

  function showHandler(){
    setshowModal(true);
  }

  function hideHandler(){
    setshowModal(false);
  }

  return (
    <div className="">
    <CartProv>
      {showModal && <Cart onHide={hideHandler}/>}  
      <Header onShow={showHandler} />
      <Meals />
    </CartProv>
    <div className='foot'>
      Designed and created by Mohammed Ayaan Siddiqui😊
    </div>
     </div>
  );
}

export default App;
