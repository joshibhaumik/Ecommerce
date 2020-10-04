import React, { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { withRouter } from "react-router-dom";

import Login from "../Modals/LoginModal";

const Header = props => {
  const [auth, toggleAuth] = useState(false);
  const [login, toggleLogin] = useState(false);

  const Logout = () => {
    // Log the user out
    toggleAuth(false);
  }

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
        <Navbar.Brand href="/" style={{fontSize:23}}>Online Store</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-4 mr-auto" style={{fontSize:19}}>
            <Nav.Link onClick={()=>{
              if(!auth) {
                toggleLogin(true);
              } else {
                props.history.push("/store/:storeId");
              }
            }} className="mr-2">
              <i className="fas fa-store"></i> Store
            </Nav.Link>
            <Nav.Link href="/cart" className="ml-2 mr-2">
                <i className="fas fa-shopping-cart"></i> Cart
            </Nav.Link>
            <Nav.Link className="ml-2" onClick={() => auth ? Logout() : toggleLogin(true)}>
              <i className="fas fa-sign-out-alt"></i> {auth ? "Logout" : "Login"}
            </Nav.Link>
          </Nav>
          <Nav style={{fontSize:19}}>
            <Nav.Link href="/user/:userId">
              <i className="fas fa-user"></i> Profile
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Login show={login} handleClose={()=>toggleLogin(false)}/>
    </>
  );
}

export default withRouter(Header);
