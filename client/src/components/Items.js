import React from 'react';
import "../styles/item.css";

const RenderAnItem = props => {
    const { details } = props;
    return (
        <div>{details}</div>
    );
}

const Items = props => {
    if(props.payload === undefined || props.payload.length === 0) {
        return (<p style={{color:"grey"}}>The Store has NO Items to display.</p>);
    }
    return props.payload.map(item => <RenderAnItem details={item} />);
}
 
export default Items;