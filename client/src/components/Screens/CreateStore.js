import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createStore } from "../../actions/storeAction";
import "../../styles/store.css";

const CreateStore = props => {
  let details = props.location.state;
  details = details === undefined ? { name: "", description: "" } : details;
  const [storeName, setName] = useState(details.name);
  const [nameError, setNameError] = useState("");
  const [storeDescription, setDescription] = useState(details.description);
  const [descriptionError, setDescriptionError] = useState("");
  const [check, toggleCheck] = useState(false);
  const [error, setError] = useState(false);

  useEffect(()=> {
    if(props.user.store !== undefined) {
      props.history.push("/my-store");
    }
    document.title = "Create your Store";
  }, []);

  const validateInput = () => {
    let error = "";
    if (storeName.length === 0) {
      error = "Please enter name of the store.";
    } else if (storeName.length >= 100) {
      error = "Name is too big.";
    }
    setNameError(error);
  };

  const validateDescription = () => {
    let error = "";
    if (storeDescription.length === 0) {
      error = "Please enter description of the store.";
    } else if (storeDescription.length >= 100) {
      error = "Description is too big.";
    }
    setDescriptionError(error);
  };

  const handleSubmit = e => {
    e.preventDefault();
    validateInput();
    validateDescription();
    if (!check) {
      setError(true);
    } 
    if (storeName !== "" && storeDescription !== "" && check) {
      props.createStore({
        name: storeName,
        description: storeDescription
      });
      props.history.push("/my-store");
    }
  };

  return (
    <div className="center-it create-store-form-container">
      <h3 className="text-center">Create Your own Store?</h3>
      <form onSubmit={handleSubmit} method="POST">
        <div className="container my-5">
          <div className="row">
            <div className="col-sm-12 form-group input-field-container">
              <input
                type="text"
                value={storeName}
                id="name"
                className="form-control input-field shadow-none"
                onChange={e => {
                  setName(e.target.value);
                  setNameError("");
                }}
                onBlur={validateInput}
                autoComplete="off"
              />
              <label className="floating-label" htmlFor="name">
                Name
              </label>
              {nameError && (
                <small className="text-danger ml-3">{nameError}</small>
              )}
            </div>
            <div className="mt-3 col-sm-12 form-group input-field-container">
              <label htmlFor="description">Description</label>
              <textarea
                style={{ resize: "none" }}
                type="text"
                rows={6}
                id="description"
                value={storeDescription}
                className="form-control"
                onChange={e => {
                  setDescription(e.target.value);
                  setDescriptionError("");
                }}
                onBlur={validateDescription}
                autoComplete="off"
              />
              {descriptionError && (
                <small className="text-danger ml-3">{descriptionError}</small>
              )}
            </div>
            <div className="mt-3 ml-3 col-sm-12 form-check">
              <input
                type="checkbox"
                checked={check}
                className="form-check-input"
                id="TandC"
                onChange={() => {
                  toggleCheck(!check);
                  setError(false);
                }}
              />
              <label className="form-check-label" htmlFor="TandC">
                Terms & Conditions
              </label>
              <br />
              {error && (
                <small className="text-danger">
                  Please Check the Terms & Conditions checkbox
                </small>
              )}
            </div>
            <div className="col-sm-12 mt-4" style={{ textAlign: "center" }}>
              <input
                className="btn btn-primary"
                type="submit"
                value="Create Store"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user.user
});

export default connect(mapStateToProps, { createStore })(withRouter(CreateStore));
