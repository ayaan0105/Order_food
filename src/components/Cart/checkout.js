import { useRef, useState} from 'react';
import classes from './checkout.module.css';

const isEmpty = value => value.trim() === '';

const isfivechars = value => value.trim().length === 6;

const Checkout = (props) => {

  const [isValid, setIsValid] = useState({
    name: true,
    city: true,
    postal: true,
    street: true
  });
  
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value; 
    const enteredPostal = postalInputRef.current.value; 
    const enteredCity = cityInputRef.current.value; 
 
    const nameIsValid = !isEmpty(enteredName);
    const streetIsValid = !isEmpty(enteredStreet);
    const cityIsValid = !isEmpty(enteredCity);
    const postalIsValid = isfivechars(enteredPostal);

    setIsValid({
      name: nameIsValid,
      city: cityIsValid,
      postal: postalIsValid,
      street: streetIsValid
    })
    
    const formisValid = nameIsValid && streetIsValid && cityIsValid && postalIsValid; 

    if (!formisValid) {
      return;
    }

    props.onConfirm({
      name:enteredName,
      street: enteredStreet,
      city:enteredCity,
      postal:enteredPostal
    })
  };

  const formClassesName = `${classes.control} ${isValid.name  ? '' : classes.invalid}`;
  const formClassesCity = `${classes.control} ${isValid.city  ? '' : classes.invalid}`;
  const formClassesPostal = `${classes.control} ${isValid.postal  ? '' : classes.invalid}`;
  const formClassesStreet = `${classes.control} ${isValid.street ? '' : classes.invalid}`;


  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={formClassesName}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef} />
        {!isValid.name && <p style={{color: '#FF6347'}}>Please enter a valid input</p>}
      </div>
      <div className={formClassesStreet}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef} />
        {!isValid.street && <p style={{color: '#FF6347'}}>Please enter a valid input</p>}
      </div>
      <div className={formClassesPostal}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalInputRef} />
        {!isValid.postal && <p style={{color: '#FF6347'}}>Please enter a valid input</p>}
      </div>
      <div className={formClassesCity}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef} />
        {!isValid.city && <p style={{color: '#FF6347'}}>Please enter a valid input</p>}
      </div>
      <div className={classes.actions}>
        <button className={classes.cancel} type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit} type="submit">Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;