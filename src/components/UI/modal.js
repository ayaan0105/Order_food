import React from 'react';
import './modal.css';
import  ReactDOM from 'react-dom';

function Backdrop(props){
    return <div className="backdrop" onClick={props.onDisplay}></div>
};

function Overlay(props){
    return(
    <div className="m2">
         <div className="modal">
        <div className="content">{props.children}</div>
    </div>
    </div>
    );
};

const  portalElement = document.getElementById('overlay');

function modal(props){
    return (
    <React.Fragment>
    {ReactDOM.createPortal(<Backdrop onDisplay={props.onClick}/>, portalElement)}
    {ReactDOM.createPortal(<Overlay>{props.children}</Overlay>, portalElement)}
    </React.Fragment>
    );
};

export default modal;