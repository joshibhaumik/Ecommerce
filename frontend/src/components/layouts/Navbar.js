import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">
          Ecommerce
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#Navigation"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {!this.props.authenticate && (
          <div className="collapse navbar-collapse" id="Navigation">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink activeClassName="selected" className="nav-link" to="/">
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink activeClassName="selected" className="nav-link" to="/register">
                  Register
                </NavLink>
              </li>
            </ul>
          </div>
        )}
        {this.props.authenticate && (
          <div className="collapse navbar-collapse" id="Navigation">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link" href="#">
                  Home <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Features
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Pricing
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link disabled"
                  href="#"
                  tabindex="-1"
                  aria-disabled="true"
                >
                  Disabled
                </a>
              </li>
            </ul>
          </div>
        )}
      </nav>
    );
  }
}

export default Navbar;
