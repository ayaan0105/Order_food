import CartIcon from "../Cart/cartIcon";
import { useContext, useEffect,useState } from "react";
import './headerCartBtn.css';
import Context from '../../store/context';

function HeaderBtn(props){

    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
    const ctx = useContext(Context);
    const { items } = ctx;
    const NumOfCartItems = items.reduce((num,item)=>{
        return num + item.amount;
    },0);

    const bump = `${"button"} ${ btnIsHighlighted ? "bump": ''}`;

    useEffect(() => {
        if (items.length === 0) {
          return;
        }
        setBtnIsHighlighted(true);
    
        const timer = setTimeout(() => {
          setBtnIsHighlighted(false);
        }, 300);
    
        return () => {
          clearTimeout(timer);
        };
      }, [items]);
    
return (
 <button className={bump} onClick={props.onClick}>
     <span className="icon">
         <CartIcon />
     </span>
     <span> Your Cart</span>
     <span className="badge">{NumOfCartItems}</span>
 </button>
);
};

export default HeaderBtn;