import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { deleteUser } from "../../actions/userActions";
import { withRouter } from "react-router-dom";

const Profile = props => {
  const [response, setResponse] = useState({});
  const [hasStore, toggleStore] = useState(false);

  const getUser = async id => {
    try {
      const response = await axios.get(
        "/api/users/" + props.match.params.userId
      );
      const res = await axios.get("/api/store/" + response.data.payload.store);
      setResponse({
        ...response.data.payload,
        description: res.data.payload.description
      });
      document.title = response.data.payload.displayName;
      if (response.data.payload.store !== undefined) {
        toggleStore(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const deleteAccount = () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? All your Information will be deleted."
      )
    ) {
      props.deleteUser();
    }
  };

  return (
    <div className="center-it profile-container">
      <div style={{ textAlign: "center" }}>
        <img
          style={{ borderRadius: "50%" }}
          src={response.image}
          alt="Profile"
          width={250}
          height={250}
        />
      </div>
      <br />
      <div>
        <h3 className="text-muted text-center">{response.displayName}</h3>
        <br />
        <table className="table" style={{ width: 750 }}>
          <tbody>
            <tr>
              <td>First Name</td>
              <td>{response.firstName}</td>
            </tr>
            <tr>
              <td>Last Name</td>
              <td>{response.lastName}</td>
            </tr>
            <tr>
              <td>Store</td>
              <td>
                {hasStore ? (
                  <div>
                    {props.match.params.userId === props.user._id ? (
                      <Link to="/store/create">Edit Store</Link>
                    ) : (
                      <Link to={"/store/" + response.store}>Visit Store</Link>
                    )}
                  </div>
                ) : props.match.params.userId === props.user._id ? (
                  <div>
                    You don't have any store{" "}
                    <Link to="/store/create">Create One?</Link>
                  </div>
                ) : (
                  <div className="text-muted">
                    {response.displayName} does not have a Store.
                  </div>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {hasStore && (
        <div>
          <hr />
          <h3 className="text-muted">Store Description</h3>
          <p className="p-3">{response.description}</p>
          <hr />
        </div>
      )}
      {props.match.params.userId === props.user._id && (
        <div className="my-5">
          <p className="text-muted">Do you want to delete your account?</p>
          <button className="btn btn-danger" onClick={deleteAccount}>
            Delete Your Account
          </button>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user.user
});

export default connect(
  mapStateToProps,
  { deleteUser }
)(withRouter(Profile));
