import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { deleteUser } from "../../actions/userActions";

const Profile = props => {
  console.log(props.match);
  const [response, setResponse] = useState({});
  const [hasStore, toggleStore] = useState(false);

  const getUser = async id => {
    const response = await axios.get("/api/users/5f698e32d265814d646e8899");
    setResponse(response.data.payload);
    document.title = response.data.payload.displayName;
    if (response.data.payload.store !== undefined) {
      toggleStore(true);
    }
  }

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
                    Store <Link to="/store/create">Edit Store</Link>
                  </div>
                ) : (
                  <div>
                    You don't have any store{" "}
                    <Link to="/store/create">Create One?</Link>
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
          <p className="p-3">
            {
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis nulla quis ex semper porta. Vivamus vel metus sed augue interdum lacinia. Cras diam sapien, elementum ac sodales sit amet, fermentum sed augue. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus dui risus, convallis in lorem sed, vulputate posuere quam. In maximus dolor quis lorem iaculis imperdiet. Donec mollis sapien nec arcu volutpat ultrices."
            }
          </p>
          <hr />
        </div>
      )}
      {true === props.user._id && <div className="my-5">
        <p className="text-muted">Do you want to delete your account?</p>
        <button className="btn btn-danger" onClick={deleteAccount}>
          Delete Your Account
        </button>
      </div>}
    </div>
  );
};

const mapStateToProps = state => ({
  user:state.user.user
});

export default connect(mapStateToProps, { deleteUser })(Profile);
