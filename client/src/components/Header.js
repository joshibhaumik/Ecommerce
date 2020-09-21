import React, { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";

import Login from "./LoginModal";

const Header = () => {
  const [login, toggleLogin] = useState(false);
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
        <Navbar.Brand style={{fontSize:23}}>Online Store</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-4 mr-auto" style={{fontSize:19}}>
            <Nav.Link className="mr-2">
              <i className="fas fa-store"></i> Store
            </Nav.Link>
            <Nav.Link className="ml-2 mr-2">
                <i className="fas fa-shopping-cart"></i> Cart
            </Nav.Link>
            <Nav.Link className="ml-2" onClick={() => toggleLogin(true)}>
            <i className="fas fa-sign-out-alt"></i> Login
            </Nav.Link>
          </Nav>
          <Nav style={{fontSize:19}}>
            <Nav.Link>
              <i className="fas fa-user"></i> Profile
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Login show={login} handleClose={()=>toggleLogin(false)}/>
    </>
  );
}

export default Header;
