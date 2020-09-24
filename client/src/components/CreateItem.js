import React, { useState } from 'react';

const CreateItem = props => {
    let { state } = props.location;
    if(state === undefined) {
        state = {
            name:"",
        }
    }
    const [name, setName] = useState(state.name);

    const handleSubmit = e => {
        e.preventDefault();
    }


    return(
        <div className="center-it create-item-container">
            <h3>{name || "no name"}</h3>
            <form method="POST" onSubmit={handleSubmit}>
                
            </form>
        </div>
    );
}

export default CreateItem;