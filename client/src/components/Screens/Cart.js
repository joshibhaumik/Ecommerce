import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";

import Items from "../layout/Items";
import "../../styles/cart.css";

const Cart = props => {
    const [showModal, toggleModal] = useState(false);
    const [data, setData] = useState([{
        "id":0,
        "name":"First Item",
        "price":"25",
        "quantity":"45",
        "description":"first item.",
        "category":"fruits",
        "image":"https://picsum.photos/500",
        "rating":4.5
    },{
        "id":1,
        "name":"First Item",
        "price":"25",
        "quantity":"45",
        "description":"first item.",
        "category":"fruits",
        "image":"https://picsum.photos/500",
        "rating":4.5
    }]);

    useEffect(()=> {
        document.title = "Your Cart";
    }, []);

    const calculateAmount = () => {
        let amt = 0;
        data.forEach(e=> amt += (e.price * e.quantity));
        return amt;
    }

    const CheckOutModal = () => (
        <Modal show={showModal} onHide={()=>toggleModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Check Out of Online Store</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <small className="text-muted">Hope you have a great day!</small>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={()=>toggleModal(false)}>Close</button>
                <button onClick={()=>{
                    window.alert("We have forwarded your request to the Owners now they will contact you soon.");
                    toggleModal(false);
                    // empty the cart
                }} className="btn btn-primary">Check Out</button>
            </Modal.Footer>
        </Modal>
    );

    return (
        <div className="center-it">
            <div className="float-left">
                <button className="btn shadow-none store-gn-color check-out-button">Check Out & Place Order</button>
            </div>
            <div className="float-right">
                <pre className="amount">Amount: {calculateAmount()}</pre>
            </div>
            <section className="mt-5">
                <Items payload={data} forCart={true} />
            </section>
            {showModal && CheckOutModal()}
        </div>
    );
}
 
export default Cart;