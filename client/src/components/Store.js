import React, { useState } from 'react';
import "../styles/store.css";

const Store = () => {
    const [created, toggleCreated] = useState(true);

    const createdStore = ()=>
        <div>
            <p style={{color:"grey"}}>
                Welcome to your Store, you don't have any Items to sell
            </p>
            <button className="btn create-item-button">
                <i className="fas fa-plus"></i>
            </button>
        </div>

    const createStore = () => 
        <div className="center-it create-store-container">
            <p style={{color:"grey"}}>Create your Store and start selling Items</p>
            <button className="btn create-store-button">
                Create Store
            </button>
        </div>

    return (
        <div>
           {created? createdStore(): createStore()} 
        </div>
    );
};

export default Store;