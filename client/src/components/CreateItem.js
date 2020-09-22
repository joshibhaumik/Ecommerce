import React, { useState } from 'react';

const CreateItem = props => {
    const [name, setName] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
    }

    return(
        <div className="center-it create-item-container">
            <h3>Create Item?</h3>
            <form method="POST" onSubmit={handleSubmit}>
                
            </form>
        </div>
    );
}

export default CreateItem;