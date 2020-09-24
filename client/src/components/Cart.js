import React, { useState } from "react";
import Items from "./Items";
import "../styles/cart.css";
import { Modal } from "react-bootstrap";

const Cart = props => {
    const [showModal, toggleModal] = useState(true);

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
        <div>
           <Items payload={[{
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
                }]} forCart={true} />
            <button onClick={()=>toggleModal(true)} className="btn btn-danger check-out-button">Check Out</button>
            {showModal && CheckOutModal()}
        </div>
    );
}
 
export default Cart;