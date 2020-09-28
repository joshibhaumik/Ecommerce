import React, { useState } from "react";
import "../styles/store.css";
import Items from "./Items";

const Store = props => {
  const [created, toggleCreated] = useState(true);

  const handleEdit = () => {
    props.history.push({
      pathname: "/store/create",
      state: {
        name: "My Store",
        description: "This is my Store"
      }
    });
  };

  const createdStore = () => (
    <div>
      <div>
        <h3>Store Name</h3>
      </div>
      <div>
        <button
          title="Your Notifications"
          style={{ right: window.innerWidth <= 800 ? 50 : 150 }}
          onClick={() => props.history.push("/notifications")}
          className="btn btn-general notification-store-button"
        >
          <i className="fas fa-bell"></i>{" "}
          {window.innerWidth <= 800 ? "" : "Notifications"}
        </button>
        <button
          title="Edit Store"
          onClick={handleEdit}
          className="btn btn-general edit-store-button"
        >
          <i className="fas fa-marker"></i>{" "}
          {window.innerWidth <= 800 ? "" : "Edit Store"}
        </button>
      </div>
      <div className="store-contains">
        <Items payload={[]} canEdit={true} />
        <button title="Create Item" className="btn btn-danger circle-button">
          <i className="fas fa-plus"></i>
        </button>
      </div>
    </div>
  );

  const createStore = () => (
    <div className="center-it create-store-container">
      <p className="text-muted">Create your Store and start selling Items</p>
      <button className="btn btn-general-lg">Create Store</button>
    </div>
  );

  return <div>{created ? createdStore() : createStore()}</div>;
};

export default Store;
