import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { emptyTheCart, generateNotifications } from "../../actions/userActions";

import Items from "../layout/Items";
import "../../styles/cart.css";

const Cart = props => {
  const [showModal, toggleModal] = useState(false);
  const [data, setData] = useState(props.user.cart);
  const [email, setEmail] = useState(props.user.email || "");
  const [err, setErr] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    document.title = "Your Cart";
  }, []);

  const calculateAmount = () => {
    let amt = 0;
    for (let item of data) {
      amt += Number(item.price.slice(1)) * item.quantity;
    }
    return amt;
  };

  const checkout = () => {
    window.alert(
      "We have forwarded your request to the Owners now they will contact you soon."
    );
    if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      )
    ) {
      toggleModal(false);
      let notifications = [];
      for (let item of data) {
        notifications.push({
          email: email,
          price: item.price,
          quantity: item.quantity,
          item: item._id,
          message: message
        });
      }
      props.generateNotifications(notifications);
      props.emptyTheCart();
      setEmail("");
      setMessage("");
    } else {
      setErr("Enter a valid email");
    }
  };

  const CheckOutModal = () => (
    <Modal show={showModal} onHide={() => toggleModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Check Out of Online Store</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          <p className="text-danger">
            Enter your email so the owner can contact you.
          </p>
          <div className="row">
            <div className="form-group col-sm-12">
              <label forHtml="email">Email </label>
              <input
                type="email"
                className="form-control"
                onChange={e => setEmail(e.target.value)}
                value={email}
                id="email"
              />
            </div>
            {err && <small className="text-danger">{err}</small>}
            <div className="form-group col-sm-12">
              <label forHtml="message">Message </label>
              <textarea
                placeholder="Any message for the owner?"
                style={{ resize: "none" }}
                rows={4}
                type="text"
                className="form-control"
                onChange={e => setMessage(e.target.value)}
                value={message}
                id="message"
              />
            </div>
          </div>
          <small className="text-muted">Hope you have a great day!</small>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="btn btn-secondary"
          onClick={() => toggleModal(false)}
        >
          Close
        </button>
        <button onClick={checkout} className="btn btn-primary">
          Check Out
        </button>
      </Modal.Footer>
    </Modal>
  );

  return (
    <div className="center-it">
      <div className="float-left">
        <button
          onClick={() => toggleModal(true)}
          className="btn shadow-none store-gn-color check-out-button"
        >
          Check Out & Place Order
        </button>
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
};

const mapStateToProps = state => ({
  user: state.user.user
});

export default connect(
  mapStateToProps,
  { emptyTheCart, generateNotifications }
)(Cart);
