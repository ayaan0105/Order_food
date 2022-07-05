import React from 'react';
import CartBtn from './headerCartBtn';
import './header.css';
import mealsImage from '../../assets/meals2.jpg';

function header(props){
    return (
        <React.Fragment>
            <header className="header">
                <h1>Meals</h1>
                <CartBtn onClick={props.onShow} />
            </header>
            <div className="main-image">
                <img src={mealsImage} alt="food images"></img>
            </div>
        </React.Fragment>
    );
};

export default header;