import './card.css';

function card(props){

    // if (props.width) {
    //     const cls = `${'crd'}`;
    // }
    return (
        <div className={`${props.width ? 'crd': 'card' }`}>
            {props.children}
        </div>
    );
};

export default card;