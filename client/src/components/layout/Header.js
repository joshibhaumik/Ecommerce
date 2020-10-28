import React, { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { logoutUser } from "../../actions/userActions";

import Login from "../Modals/LoginModal";

const Header = props => {
  const [login, toggleLogin] = useState(false);

  const Logout = () => {
    props.logoutUser();
    props.history.push("/");
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
        <Navbar.Brand href="/" style={{ fontSize: 23 }}>
          Online Store
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-4 mr-auto" style={{ fontSize: 19 }}>
            <Nav.Link href="/my-store" className="mr-2">
              <i className="fas fa-store"></i> My Store
            </Nav.Link>
            <Nav.Link href="/notifications" className="mr-2">
              <i className="fas fa-bell"></i> Notifications ({props.user.notifications ? props.user.notifications.length : 0})
            </Nav.Link>
            <Nav.Link href="/cart" className="ml-2 mr-2">
              <i className="fas fa-shopping-cart"></i> Cart ({props.user.cart ? props.user.cart.length : 0})
            </Nav.Link>
            <Nav.Link
              className="ml-2"
              onClick={() => (props.auth ? Logout() : toggleLogin(true))}
            >
              <i className="fas fa-sign-out-alt"></i>{" "}
              {props.auth ? "Logout" : "Login"}
            </Nav.Link>
          </Nav>
          <Nav style={{ fontSize: 19 }}>
            <Nav.Link
              onClick={() => {
                if (props.auth) {
                  props.history.push("/user/" + props.user._id);
                } else {
                  toggleLogin(true);
                }
              }}
            >
              <i className="fas fa-user"></i> Profile
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Login show={login} handleClose={() => toggleLogin(false)} />
    </>
  );
};

const mapStatesToProps = state => ({
  user: state.user.user,
  auth: state.user.isAuthenticated
});

export default connect(
  mapStatesToProps,
  { logoutUser }
)(withRouter(Header));
