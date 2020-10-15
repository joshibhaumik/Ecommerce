import React, { useEffect } from "react";
import { Modal, Card } from "react-bootstrap";
import "../../styles/login.css";

const Login = props => {
  const redirect = () => {
    window.localStorage.setItem("atLogin", window.location.href);
    window.location.href = "http://localhost:5000/auth/login";
  };

  useEffect(() => {
    document.title = "Login";
  }, []);

  return (
    <Modal show={props.show} onHide={props.handleClose} animation={true}>
      <Modal.Header closeButton style={{ fontSize: 30 }}>
        Login to Online Store
      </Modal.Header>
      <Card>
        <Card.Body>
          <Card.Text>
            Welcome to Online Store <br />
            <ul>
              <li>
                You can see other people items, and can contact them to buy it.
              </li>
              <li>
                You can create your own store and add items to it so that
                people's can buy them.
              </li>
              <li>You can write a review for an item.</li>
            </ul>
          </Card.Text>
          <div style={{ textAlign: "center", marginTop: 30 }}>
            <button onClick={redirect} className="login-link">
              Login with Google+
            </button>
          </div>
        </Card.Body>
      </Card>
    </Modal>
  );
};

export default Login;
