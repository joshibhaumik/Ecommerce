import React, { Component } from "react";
import { Link } from "react-router-dom";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      passwrod: "",
      cpassword: "",
      emailerror: "",
      passworderror: "",
      cpassworderror: "",
      message:""
    };
  }
  handleInput(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
  }
  closeAlert(e) {
    this.setState({ [e.target.dataset.errorin]: "" });
  }
  render() {
    return (
      <div className="row justify-content-center mt-5">
        <div className="col col-sm-3">
          <div className="card" style={{ width: "18rem" }}>
            <div className="card-header bg-dark">
              <h5 className="text-light">Register</h5>
            </div>
            <div className="card-body">
              <form onSubmit={this.handleSubmit.bind(this)}>
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    onChange={this.handleInput.bind(this)}
                    aria-describedby="emailerror"
                    value={this.state.email}
                    placeholder="Enter email"
                  />
                  {this.state.emailerror && (
                    <div
                      className="alert alert-danger alert-dismissible fade show"
                      role="alert"
                    >
                      {this.state.emailerror}
                      <button
                        type="button"
                        onClick={this.closeAlert.bind(this)}
                        className="close"
                        aria-label="Close"
                      >
                        <span aria-hidden="true" data-errorin="emailerror">
                          &times;
                        </span>
                      </button>
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    onChange={this.handleInput.bind(this)}
                    aria-describedby="passworderror"
                    value={this.state.password}
                    placeholder="Enter Password"
                  />
                  {this.state.passworderror && (
                    <div
                      className="alert alert-danger alert-dismissible fade show"
                      role="alert"
                    >
                      {this.state.passworderror}
                      <button
                        type="button"
                        onClick={this.closeAlert.bind(this)}
                        className="close"
                        aria-label="Close"
                      >
                        <span aria-hidden="true" data-errorin="passworderror">
                          &times;
                        </span>
                      </button>
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="cpassword">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="cpassword"
                    name="cpassword"
                    onChange={this.handleInput.bind(this)}
                    aria-describedby="cpassworderror"
                    value={this.state.cpassword}
                    placeholder="Confirm Password"
                  />
                  {this.state.cpassworderror && (
                    <div
                      className="alert alert-danger alert-dismissible fade show"
                      role="alert"
                    >
                      {this.state.cpassworderror}
                      <button
                        type="button"
                        onClick={this.closeAlert.bind(this)}
                        className="close"
                        aria-label="Close"
                      >
                        <span aria-hidden="true" data-errorin="cpassworderror">
                          &times;
                        </span>
                      </button>
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <Link to="terms_conditions">Terms & Conditions</Link>
                </div>
                {this.state.message && (
                  <div
                    className="alert alert-danger alert-dismissible fade show"
                    role="alert"
                  >
                    {this.state.message}
                    <button
                      type="button"
                      onClick={this.closeAlert.bind(this)}
                      className="close"
                      aria-label="Close"
                    >
                      <span aria-hidden="true" data-errorin="message">
                        &times;
                      </span>
                    </button>
                  </div>
                )}
                <button type="submit" className="btn btn-primary">
                  Create Account
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
