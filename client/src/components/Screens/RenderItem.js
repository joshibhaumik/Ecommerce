import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/item.css";
import ReviewModal from "../Modals/ReviewModal";
import axios from "axios";
import { connect } from "react-redux";

const RenderItem = props => {
  const [response, setResponse] = useState({});
  const [show, toggleShow] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [details, setDetails] = useState({});

  const getDetails = async id => {
    try {
      const response = await axios.get(
        "/api/items/" + props.match.params.itemId
      );
      setResponse(response.data.payload);
      setReviews(response.data.payload.reviews);
      document.title = Capitalise(response.data.payload.name);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDetails(props.match.params.itemId);
  }, []);

  const Capitalise = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const ReviewAddedRating = review => {
    let { rating } = response;
    rating = (rating * reviews.length + review.rating) / (reviews.length + 1);
    setResponse({
      ...response,
      rating: rating
    });
  };

  const ReviewDeleteRating = async review => {
    try {
      const res = await axios.delete("/api/reviews/" + review._id);
      let { rating } = response;
      if (reviews.length === 1) {
        rating = 0;
      } else {
        rating =
          (rating * reviews.length - review.rating) / (reviews.length - 1);
      }
      setResponse({
        ...response,
        rating: rating
      });
    } catch (error) {
      console.log(error);
    }
  };

  const AddReview = review => {
    setReviews([review, ...reviews]);
    ReviewAddedRating(review);
  };

  
  const DeleteReview = review => {
    if (window.confirm("Are you sure you want to delete your review?")) {
      setReviews(reviews.filter(e => e._id !== review._id));
      ReviewDeleteRating(review);
    }
  };

  const UpdateReview = (oldReview, newReview) => {
    let reviews_ = reviews.filter(e => e._id !== oldReview._id);
    reviews_ = [newReview, ...reviews_];
    setReviews(reviews_);
  };

  const EditReview = review => {
    setDetails(review);
    toggleShow(true);
  }

  const RenderReview = review => (
    <tr key={review._id}>
      <td>
        <div>
          <Link to={"/user/" + review.user}>{review.displayName}</Link>
          <span className="ml-4 text-muted" style={{ fontSize: 13 }}>
            {review.createdAt}
          </span>
          {props.auth && props.user._id === review.user && (
            <span>
              <i
                style={{ cursor: "pointer" }}
                onClick={() => DeleteReview(review)}
                className="text-danger float-right fas fa-trash-alt"
              ></i>
              <i
                style={{ cursor: "pointer" }}
                onClick={() => EditReview(review)}
                className="text-primary mr-3 float-right fas fa-edit"
              ></i>
            </span>
          )}
        </div>
        <div>Rating: {review.rating}</div>
        <p>{review.review}</p>
      </td>
    </tr>
  );

  return (
    <>
      <button
        title="Add A Review"
        className="btn btn-danger circle-button"
        onClick={() => toggleShow(true)}
      >
        <i className="fas fa-plus"></i>
      </button>
      <div className="mt-4 center-it render-items-container">
        <div className="row">
          <div className="col-sm-6">
            <img src={response.image} alt="Item" width={400} height={350} />
          </div>
          <div className="offset-sm-1 col-sm-5">
            <h3 className="ml-2 text-muted">
              {Capitalise(response.name || "")}
            </h3>
            <table className="table">
              <tbody>
                <tr>
                  <td>Price per Quantity</td>
                  <td>{response.price}</td>
                </tr>
                <tr>
                  <td>Quantities Available</td>
                  <td>{response.quantity}</td>
                </tr>
                <tr>
                  <td>Category</td>
                  <td>{Capitalise(response.category || "")}</td>
                </tr>
                <tr>
                  <td>Rating</td>
                  <td>
                    {response.rating === -1 || response.rating === 0
                      ? "Unrated"
                      : response.rating}
                  </td>
                </tr>
                <tr>
                  <td>Reviews</td>
                  <td>{reviews.length}</td>
                </tr>
                <tr>
                  <td>Store</td>
                  <td>
                    <Link to={"/store/" + response.store}>Visit Store?</Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <hr />
          <h3 className="text-muted">Description</h3>
          <p className="p-3">{response.description}</p>
          <hr />
        </div>
        <div>
          <h1 className="text-muted">Reviews</h1>
          <div className="mb-4 p-3">
            {reviews.length === 0 ? (
              <p className="text-muted">
                No reviews yet. Be the first to review it?
              </p>
            ) : (
              <table className="table table-striped">
                <tbody>{reviews.map(e => RenderReview(e))}</tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      <ReviewModal
        id={response._id}
        addReview={AddReview}
        updateReview={UpdateReview}
        show={show}
        handleClose={() => toggleShow(false)}
        details={details}
      />
    </>
  );
};

const mapStateToProps = state => ({
  user: state.user.user,
  auth: state.user.isAuthenticated
});

export default connect(mapStateToProps)(RenderItem);
