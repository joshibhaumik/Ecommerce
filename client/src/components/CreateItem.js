import React, { useState } from "react";
import { withRouter } from "react-router-dom";

const CreateItem = props => {
  let state = props.location.state;
  if (state === undefined) {
    state = {
      name: "",
      price: "",
      quantity: 0,
      category: "fruits",
      image: "",
      description: ""
    };
  }
  const [itemName, setItemName] = useState(state.name);
  const [itemNameError, setItemNameError] = useState("");
  const [itemPrice, setItemPrice] = useState(state.price);
  const [itemPriceError, setItemPriceError] = useState("");
  const [itemQuantity, setItemQuantity] = useState(state.quantity);
  const [itemQuantityError, setItemQuantityError] = useState("");
  const [itemDescription, setItemDescription] = useState(state.description);
  const [itemDescriptionError, setItemDescriptionError] = useState("");
  const [itemCategory, setItemCategory] = useState(state.category);
  const [itemCategoryError, setItemCategoryError] = useState("");
  const [itemImage, setitemImage] = useState(state.image);
  const [itemImageError, setitemImageError] = useState("");
  const [check, toggleCheck] = useState(false);
  const [error, setError] = useState(false);

  const Capitalise = str => str.charAt(0).toUpperCase() + str.slice(1);

  const handleSubmit = e => {
    e.preventDefault();
  };

  const validateFile = fileName => {};

  const validateInput = e => {};

  return (
    <div className="center-it create-item-container">
      <form method="POST" onSubmit={handleSubmit}>
        <div className="container my-5">
          <div className="row">
            <div className="col-sm-12 form-group input-field-container">
              <input
                type="text"
                value={itemName}
                id="name"
                className="form-control input-field shadow-none"
                onChange={e => {
                  setItemName(e.target.value);
                  setItemNameError("");
                }}
                onBlur={validateInput}
                autoComplete="off"
              />
              <label className="floating-label" htmlFor="name">
                Item Name
              </label>
              {itemNameError && (
                <small className="text-danger ml-3">{itemNameError}</small>
              )}
            </div>
            <div className="col-sm-12 my-4 form-group input-field-container">
              <input
                type="text"
                value={itemPrice}
                id="price"
                className="form-control input-field shadow-none"
                onChange={e => {
                  setItemPrice(e.target.value);
                  setItemPriceError("");
                }}
                onBlur={validateInput}
                autoComplete="off"
              />
              <label className="floating-label" htmlFor="price">
                Item Price{" "}
                <small className="text-muted">
                  *include your currency symbol
                </small>
              </label>
              {itemPriceError && (
                <small className="text-danger ml-3">{itemPriceError}</small>
              )}
            </div>
            <div className="col-sm-12 my-4 form-group input-field-container">
              <input
                type="number"
                value={itemQuantity}
                id="quantity"
                className="form-control input-field shadow-none"
                onChange={e => {
                  setItemQuantity(e.target.value);
                  setItemQuantityError("");
                }}
                onBlur={e =>
                  (typeof e.target.value !== "number" &&
                    setItemQuantityError("Quantity should be a number")) ||
                  (e.target.value < 0 &&
                    setItemQuantityError(
                      "Quantities should be a positive number"
                    ))
                }
                autoComplete="off"
              />
              <label className="floating-label" htmlFor="quantity">
                Item Quantity
              </label>
              {itemQuantityError && (
                <small className="text-danger ml-3">{itemQuantityError}</small>
              )}
            </div>
            <div className="col-sm-12 my-4 form-group input-field-container">
              <label htmlFor="category">Category</label>
              <select
                className="form-control input-field shadow-none"
                id="category"
                value={itemCategory}
                onChange={e => setItemCategory(e.target.value)}
              >
                {[
                  "vegetables",
                  "groceries",
                  "electronics",
                  "stationery",
                  "fruits"
                ].map(option => (
                  <option value={option}>{Capitalise(option)}</option>
                ))}
              </select>
            </div>
            <div className="col-sm-12 my-4 form-group input-field-container">
              <div class="custom-file">
                <input
                  onChange={e => {
                    validateFile(e.target.files[0].name);
                    setitemImage(e.target.files[0].name);
                  }}
                  type="file"
                  class="custom-file-input"
                  id="image"
                />
                <label class="custom-file-label" htmlFor="image">
                  {itemImage || "Upload Item Image"}
                </label>
              </div>
              {itemImageError && (
                <small className="text-danger ml-3">{itemImageError}</small>
              )}
            </div>
            <div className="mt-3 col-sm-12 form-group input-field-container">
              <label htmlFor="description">Description</label>
              <textarea
                style={{ resize: "none" }}
                type="text"
                rows={6}
                id="description"
                value={itemDescription}
                className="form-control"
                onChange={e => {
                  setItemDescription(e.target.value);
                  setItemDescriptionError("");
                }}
                onBlur={e => {
                  if (e.target.value === "") {
                    setItemDescriptionError("Enter Description");
                  } else if (e.target.value.length > 1000) {
                    setItemDescriptionError("Exceed Description Length");
                  }
                }}
                autoComplete="off"
              />
              {itemDescriptionError && (
                <small className="text-danger ml-3">
                  {itemDescriptionError}
                </small>
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
                value="Create Item"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default withRouter(CreateItem);
