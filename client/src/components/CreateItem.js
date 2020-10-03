import React, { useReducer } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

const initialState = {
  name: "",
  price: "",
  quantity: 0,
  category: "fruits",
  image: "",
  description: "",
  nameError: "",
  priceError: "",
  quantityError: "",
  descriptionError: "",
  imageError: "",
  valid: false,
  imageLoading: "",
  imageName: "",
  error: "",
  toggleeError: false,
  checkBox: false
};

const ItemCreationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "overwrite":
      return {
        ...state,
        ...[action.details]
      };
    case "write":
      return {
        ...state,
        [action.key]: action.value,
        [String(action.key) + "Error"]: ""
      };
    case "error":
      return {
        ...state,
        [action.key]: action.value
      };
    case "imageName":
      return {
        ...state,
        imageName: action.value
      };
    case "check":
      return {
        ...state,
        checkBox: !state.checkBox,
        toggleeError: ""
      };
    default:
      return state;
  }
};

const CreateItem = props => {
  let details = props.location.state;
  const [state, dispatch] = useReducer(ItemCreationReducer, initialState);
  if (details !== undefined) {
    dispatch({ type: "overwrite", details });
  }

  const Capitalise = str => str.charAt(0).toUpperCase() + str.slice(1);

  const handleSubmit = e => {
    e.preventDefault();
    if (state.image === "") {
      dispatch({
        type: "error",
        key: "imageError",
        value: "Please Upload an Image"
      });
    } else if (!state.checkBox) {
      dispatch({
        type: "error",
        key: "toggleeError",
        value: true
      });
    } else if (!state.valid) {
      dispatch({
        type: "error",
        key: "error",
        value: "Please resolve the errors to submit the form."
      });
    } else {
      // upload the data and create or update an item
    }
  };

  const uploadImageToCloud = async file => {
    dispatch({
      type: "error",
      key: "imageLoading",
      value: "Uploading..."
    });
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "Instagram-Clone");
      formData.append("cloud_name", "smilingcloud");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/smilingcloud/image/upload",
        formData
      );

      dispatch({
        type: "write",
        key: "image",
        value: response.data.url
      });

      dispatch({
        type: "error",
        key: "imageLoading",
        value: "Image Uploaded Successfully"
      });

      dispatch({ type: "imageName", value: file.name });
    } catch (error) {
      dispatch({
        type: "error",
        key: "imageError",
        value: "Error occured while uploading the image, please try again."
      });
    }
  };

  const handleInput = e =>
    dispatch({
      type: "write",
      key: e.target.id,
      value: e.target.value
    });

  const validateInput = e => {
    if (!e.target.value) {
      dispatch({
        type: "error",
        key: e.target.name,
        value: "Enter the missing value"
      });
    }
  };

  return (
    <div className="center-it create-item-container">
      <form method="POST" onSubmit={handleSubmit}>
        <div className="container my-5">
          <div className="row">
            <div className="col-sm-12 form-group input-field-container">
              <input
                type="text"
                value={state.name}
                name="nameError"
                id="name"
                className="form-control input-field shadow-none"
                onChange={handleInput}
                onBlur={validateInput}
                autoComplete="off"
              />
              <label className="floating-label" htmlFor="name">
                Item Name
              </label>
              {state.nameError && (
                <small className="text-danger ml-3">{state.nameError}</small>
              )}
            </div>
            <div className="col-sm-12 my-4 form-group input-field-container">
              <input
                type="text"
                value={state.price}
                name="priceError"
                id="price"
                className="form-control input-field shadow-none"
                onChange={handleInput}
                onBlur={validateInput}
                autoComplete="off"
              />
              <label className="floating-label" htmlFor="price">
                Item Price{" "}
                <small className="text-muted">
                  *include your currency symbol
                </small>
              </label>
              {state.priceError && (
                <small className="text-danger ml-3">{state.priceError}</small>
              )}
            </div>
            <div className="col-sm-12 my-4 form-group input-field-container">
              <input
                type="number"
                value={state.quantity}
                name="quantityError"
                id="quantity"
                className="form-control input-field shadow-none"
                onChange={handleInput}
                onBlur={e =>
                  (e.target.value < 0 || typeof e.target.value === "number") &&
                  dispatch({
                    type: "error",
                    key: e.target.name,
                    value: "Quantity should be a positive number"
                  })
                }
                autoComplete="off"
              />
              <label className="floating-label" htmlFor="quantity">
                Item Quantity
              </label>
              {state.quantityError && (
                <small className="text-danger ml-3">
                  {state.quantityError}
                </small>
              )}
            </div>
            <div className="col-sm-12 my-4 form-group input-field-container">
              <label htmlFor="category">Category</label>
              <select
                className="form-control input-field shadow-none"
                id="category"
                value={state.category}
                onChange={handleInput}
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
                  onChange={e => uploadImageToCloud(e.target.files[0])}
                  type="file"
                  accept=".png,.jpg,.jpeg"
                  class="custom-file-input"
                  id="image"
                />
                <label class="custom-file-label" htmlFor="image">
                  {state.imageName || "Upload Item Image"}
                </label>
              </div>
              {state.imageError && (
                <small className="text-danger ml-3">{state.imageError}</small>
              )}
              {state.imageLoading && (
                <small className="ml-3 my-1">{state.imageLoading}</small>
              )}
            </div>
            <div className="mt-3 col-sm-12 form-group input-field-container">
              <label htmlFor="description">Description</label>
              <textarea
                style={{ resize: "none" }}
                type="text"
                rows={6}
                id="description"
                name="descriptionError"
                value={state.description}
                className="form-control"
                onChange={handleInput}
                onBlur={e => {
                  if (e.target.value === "") {
                    dispatch({
                      type: "error",
                      key: e.target.name,
                      value: "Enter Description"
                    });
                  } else if (e.target.value.length > 1000) {
                    dispatch({
                      type: "error",
                      key: e.target.name,
                      value: "Exceed Description Length"
                    });
                  }
                }}
                autoComplete="off"
              />
              {state.descriptionError && (
                <small className="text-danger ml-3">
                  {state.descriptionError}
                </small>
              )}
            </div>
            <div className="mt-3 ml-3 col-sm-12 form-check">
              <input
                type="checkbox"
                checked={state.checkBox}
                className="form-check-input"
                id="TandC"
                onChange={() => dispatch({ type: "check" })}
              />
              <label className="form-check-label" htmlFor="TandC">
                Terms & Conditions
              </label>
              <br />
              {state.toggleeError && (
                <small className="text-danger">
                  Please Check the Terms & Conditions checkbox
                </small>
              )}
            </div>
            <div className="my-3" style={{ textAlign: "center" }}>
              {state.error && <p className="text-danger">{state.error}</p>}
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
