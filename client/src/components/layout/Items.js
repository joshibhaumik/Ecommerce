import React, { useState } from "react";
import { Card } from "react-bootstrap";
import "../../styles/item.css";
import { withRouter, Link } from "react-router-dom";

const Items = props => {
  if (props.payload === undefined || props.payload.length === 0) {
    return <p style={{ color: "grey" }}>No Items to display.</p>;
  }

  const editItem = detail => {
    props.history.push({
      pathname: "/items/create",
      state: detail
    });
  };

  const deleteItem = details => {
    // delete the item
  }

  const RenderAnItem = details => (
    <div className="my-4 col-sm-3">
      {props.canEdit && (
        <div>
          <i
            className="fas fa-trash-alt delete-icon"
            onClick={() => deleteItem(details)}
          ></i>
          <i
            className="fas fa-edit edit-icon store-gn-color"
            onClick={() => editItem(details)}
          ></i>
        </div>
      )}
      <Card className="render-an-item-card">
        <Card.Img className="render-an-item-image" variant="top" src={details.image} />
        <Card.Body>
          <Card.Title>
            <Link to={"/item/" + details.itemId}>{details.name}</Link>
            <kbd className="float-right">{details.rating || "unrated"}</kbd>
          </Card.Title>
          <div className="mt-3">
            <span style={{ fontSize: 18 }}>Price: {details.price}</span>
            {!props.canEdit && <button className="btn float-right shadow-none store-gn-color add-to-cart-button">Add To Cart</button>}
        </div>
        </Card.Body>
      </Card>
    </div>
  );

  return (
    <div className={props.forCart?"":"row ml-5"}>
      {props.payload.map((item, i) =>
        props.forCart ? (
          <RenderAnItemForCart key={i} details={item} />
        ) : (
          RenderAnItem(item)
        )
      )}
    </div>
  );
};

export default withRouter(Items);

const RenderAnItemForCart = props => {
  const { details } = props;
  const [quantity, setQuantity] = useState(1);
  return (
    <div style={{position:'relative'}} className="my-4 row center-it render-cart-item">
      <div className="col-sm-3">
        <img
          alt="Cart Item"
          src={details.image}
          className="render-an-item-image"
        />
      </div>
      <div className="offset-sm-1 col-sm-8">
        <h3>
          <Link to="/item/_id">{details.name}</Link> <kbd style={{ fontSize: 15 }}>{details.rating}</kbd>
        </h3>
        <table className="table">
          <tbody>
            <tr>
              <td>Price</td>
              <td>{details.price}</td>
            </tr>
            <tr>
              <td>Quantity</td>
              <td>
                {quantity}
                <button
                  disabled={quantity >= details.quantity}
                  onClick={() => setQuantity(quantity + 1)}
                  style={{ paddingLeft: 9, paddingRight: 9 }}
                  className="mx-3 btn store-gn-color"
                >
                  +
                </button>
                <button
                  disabled={quantity === 1}
                  onClick={() => setQuantity(quantity - 1)}
                  className="btn store-gn-color"
                >
                  -
                </button>
              </td>
            </tr>
            <tr>
              <td>Category</td>
              <td>{details.category}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
