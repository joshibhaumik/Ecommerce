import React, { useState } from "react";
import { Link } from "react-router-dom";

const Profile = props => {
  const [hasStore, toggleStore] = useState(true);

  const deleteAccount = () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? All your Information will be deleted."
      )
    ) {
      // proceed to delete his/her account
    }
  };

  return (
    <div className="center-it profile-container">
      <div style={{ textAlign: "center" }}>
        <img
          style={{ borderRadius: "50%" }}
          src={"https://picsum.photos/300"}
          alt="Profile"
        />
      </div>
      <br />
      <div>
        <h3 className="text-muted text-center">{"Display Name"}</h3>
        <br />
        <table class="table" style={{ width: 750 }}>
          <tbody>
            <tr>
              <td>First Name</td>
              <td>Display</td>
            </tr>
            <tr>
              <td>Last Name</td>
              <td>Name</td>
            </tr>
            <tr>
              <td>Store</td>
              <td>
                {hasStore ? (
                  <div>
                    Store. <Link to="/store/create">Edit Store</Link>
                  </div>
                ) : (
                  <div>
                    You don't have any store{" "}
                    <Link to="/store/create">create one?</Link>
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
      <div className="my-5">
        <p style={{ color: "grey" }}>Do you want to delete your account?</p>
        <button className="btn btn-danger" onClick={deleteAccount}>
          Delete Your Account
        </button>
      </div>
    </div>
  );
};

export default Profile;
