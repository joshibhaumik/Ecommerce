import React, { useEffect } from "react";
import "../../styles/store.css";
import Items from "../layout/Items";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { deleteStore, getStore } from "../../actions/storeAction";

const MyStore = props => {
  console.log(props.store);
  useEffect(() => {
    props.getStore();
    document.title = props.user.store
      ? "Welcome to - " + props.store.name
      : "Create Your Own Store";
  }, []);

  const handleEdit = () => {
    props.history.push({
      pathname: "/create/store",
      state: {
        name: props.store.name,
        description: props.store.description
      }
    });
  };

  const DeleteStore = () => {
    if (
      window.confirm(
        "Are you sure you want to delete the store? You will lost all your items."
      )
    ) {
      deleteStore();
    }
  };

  const createdStore = () => (
    <div>
      <div>
        <h3>{props.store.name}</h3>
      </div>
      <div>
        <button
          title="Delete Store"
          style={{ right: window.innerWidth <= 800 ? 100 : 325 }}
          onClick={DeleteStore}
          className="btn btn-danger delete-store-button"
        >
          <i className="fas fa-trash-alt"></i>{" "}
          {window.innerWidth <= 800 ? "" : "Delete Store"}
        </button>
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
        <Items payload={props.store.items} canEdit={true} />
        <button title="Create Item" className="btn btn-danger circle-button">
          <i className="fas fa-plus"></i>
        </button>
      </div>
    </div>
  );

  const createStore = () => (
    <div className="center-it create-store-container">
      <p className="text-muted">Create your Store and start selling Items</p>
      <button
        className="btn btn-general-lg"
        onClick={() => props.history.push("/create/store")}
      >
        Create Store
      </button>
    </div>
  );

  return props.user.store ? createdStore() : createStore();
};

const mapStateToProps = state => ({
  user: state.user.user,
  store: state.store.store
});

export default connect(
  mapStateToProps,
  {
    deleteStore,
    getStore
  }
)(withRouter(MyStore));
