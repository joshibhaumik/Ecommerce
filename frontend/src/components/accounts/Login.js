import React, { Component } from "react";
import { Link } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
        email:"",
        password:"",
        emailerror:"",
        passworderror:"",
        message:""
    };
  }
  handleInput(e) {
    this.setState({[e.target.name]:e.target.value});
  }
  handleSubmit(e) {
    e.preventDefault();
  }
  closeAlert(e) {
    this.setState({[e.target.dataset.errorin]:""});
  }
  render() {
    return (
      <div className="row justify-content-center mt-5">
        <div className="col col-sm-3">
          <div className="card" style={{ width: "18rem" }}>
          <div className="card-header bg-dark"><h5 className="text-light">Login</h5></div>
            <div className="card-body">
              <form  onSubmit={this.handleSubmit.bind(this)}>
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
                  {this.state.emailerror && <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    {this.state.emailerror}
                    <button type="button" onClick={this.closeAlert.bind(this)} className="close" aria-label="Close">
                        <span aria-hidden="true" data-errorin="emailerror">&times;</span>
                    </button>
                  </div>}
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
                  {this.state.passworderror && <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    {this.state.passworderror}
                    <button type="button" onClick={this.closeAlert.bind(this)} className="close" aria-label="Close">
                        <span aria-hidden="true" data-errorin="passworderror">&times;</span>
                    </button>
                  </div>}
                </div>
                <div className="form-group">
                  <Link to="forgot_password">Frogot Password</Link>
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
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
