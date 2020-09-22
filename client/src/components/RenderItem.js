import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/item.css";
import ReviewModal from './ReviewModal';

const RenderItem = props => {
  const [show, toggleShow] = useState(false);

  const Capitalise = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const RenderReview = review => <tr>
  <td>
    <div>
      <Link to={"/user/"+review.userId}>{review.name}</Link>
      <span className="ml-4" style={{fontSize:13,color:"grey"}}>{review.createdAt}</span>
    </div>
    <div>Rating: {review.rating}</div>
    <p>{review.comment}</p>
  </td>
</tr>

  return (
    <>
      <button title="Add A Review" className="btn btn-danger circle-button" onClick={()=>toggleShow(true)}>
        <i className="fas fa-plus"></i>
      </button>
      <div className="mt-4 center-it render-items-container">
        <div className="row">
          <div className="col-sm-6">
            <img src={"https://picsum.photos/400"} alt="Item" />
          </div>
          <div className="offset-sm-1 col-sm-5">
            <h3 style={{color:"grey"}} className="ml-2">{Capitalise(props.match.params.itemId)}</h3>
            <table className="table">
              <tbody>
                <tr>
                  <td>Price per Quantity</td>
                  <td>$4.5</td>
                </tr>
                <tr>
                  <td>Quantities Available</td>
                  <td>20</td>
                </tr>
                <tr>
                  <td>Description</td>
                  <td>Ut eu lorem auctor, blandit magna a, ornare erat.</td>
                </tr>
                <tr>
                  <td>Category</td>
                  <td>{Capitalise("fruits")}</td>
                </tr>
                <tr>
                  <td>Rating</td>
                  <td>{4.5 ? 4.5 : "Unrated"}</td>
                </tr>
                <tr>
                  <td>Store</td>
                  <td><Link to="/store/storeName">Visit Store?</Link></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <h1 style={{color:"grey"}}>Reviews</h1>
          <div className="mb-4 p-3">
            {[].length === 0 ? (
              <p style={{color:"grey"}}>No reviews yet. Be the first to review it?</p>
            ) : (
              <table className="table table-striped">
                <tbody>
                  {[].map(e => RenderReview(e))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      <ReviewModal show={show} handleClose={()=>toggleShow(false)} />
    </>
  );
};

export default RenderItem;