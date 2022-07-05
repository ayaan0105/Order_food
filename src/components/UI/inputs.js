import './inputs.css';
import React from 'react';

const input = React.forwardRef((props,ref)=>{
    return (
        <div className="input">
            <label htmlFor={props.input.id}>{props.label}</label>
            <input {...props.input} ref={ref}/>
            {/* <input id={props.input.id} type={props.type}  />   here ...props.input -> extracts all the key value pairs and adds as attributs */}
        </div>
    );
});

export default input;