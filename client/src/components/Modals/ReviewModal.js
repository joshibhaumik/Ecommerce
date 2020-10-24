import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { connect } from "react-redux";

const ReviewModal = props => {
  const [comment, setComment] = useState(props.comment_ || "");
  const [commentError, setCommentError] = useState("");
  const [rating, setRating] = useState(props.rating_ || 1);

  const validateComment = () => {
    if (comment === "") {
      setCommentError("Comment is required");
    }
  };

  const reset = () => {
    setComment("");
    setCommentError("");
    setRating(0);
    props.handleClose();
  }

  const AddAReview = async () => {
    if(!props.auth) {
      window.alert("You cannot add a review. Please Login");
    } else {
      validateComment();
      if (comment !== "") {
        const response = await axios.post("/api/reviews/", {
          displayName: props.user.displayName,
          item: props.id,
          review: comment,
          rating: rating 
        });
        props.addReview(response.data.payload);
      }
      reset();
    }
  };

  return (
    <Modal
      backdrop="static"
      keyboard={false}
      show={props.show}
      onHide={reset}
      animation={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add A Review</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="container">
            <div className="row">
              <div className="col-sm-12 form-group">
                <label htmlFor="comment">Comment</label>
                <textarea
                  id="comment"
                  className="form-control"
                  rows={3}
                  onChange={e => setComment(e.target.value)}
                  value={comment}
                  onBlur={validateComment}
                  style={{ resize: "none" }}
                />
                {commentError && (
                  <small className="text-danger">{commentError}</small>
                )}
              </div>
              <div className="form-group col-sm-12">
                <label htmlFor="rating">Rating</label>
                <select
                  className="form-control"
                  id="rating"
                  value={rating}
                  onChange={e => setRating(e.target.value)}
                >
                  {[1, 2, 3, 4, 5].map(e => (
                    <option key={e} value={e}>{e}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={reset}>
          Close
        </button>
        <button className="btn btn-primary" onClick={AddAReview}>
          Add
        </button>
      </Modal.Footer>
    </Modal>
  );
};

const mapStateToProps = state => ({
  user:state.user.user,
  auth: state.user.isAuthenticated
});

export default connect(mapStateToProps)(ReviewModal);
