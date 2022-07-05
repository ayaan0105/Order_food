import './MealForm.css';
import Input from '../UI/inputs';
import { useRef } from 'react';

function MealForm(props){

    const inputRef = useRef();

    function submitHandler(event){
        event.preventDefault();
        const enteredAmount = inputRef.current.value;
        console.log(inputRef.current.value);
        const enteredAmountNum = +enteredAmount;

        if (enteredAmount.trim().length === 0 || enteredAmountNum > 5 || enteredAmountNum < 1) {
            return;
        }
        props.onAddToCart(enteredAmountNum);
    }
    
    return(
        <form className="form" onSubmit={submitHandler}> 
            <Input label="Amount" ref={inputRef} 
            input={{
                id:'Amount',
                type: 'number',
                min:'1',
                max:'5',
                defaultValue:'1',
                step:'1'
            }} />
            <button>+ Add</button>
        </form>
    );
};

export default MealForm;