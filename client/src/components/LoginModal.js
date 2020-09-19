import React from "react";
import { Modal, Card } from "react-bootstrap";
import "../styles/login.css";

function Login(props) {
  const redirect = () => {
    window.location.href = "http://localhost:5000/auth/login";
  }
  return (
    <Modal show={props.show} onHide={props.handleClose} animation={true}>
      <Card>
        <Card.Body>
          <Card.Title style={{ fontSize: 30 }}>
            Login to Online Store
          </Card.Title>
          <hr />
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <div style={{ textAlign: "center", marginTop:30 }}>
            <button onClick={redirect} className="login-link">Login with Google+</button>
          </div>
        </Card.Body>
      </Card>
    </Modal>
  );
}

export default Login;
