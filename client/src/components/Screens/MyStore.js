import React, { useEffect, useState } from "react";
import "../../styles/store.css";
import Items from "../layout/Items";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { deleteStore } from "../../actions/storeAction";
import axios from "axios";

const MyStore = props => {
  const [items, setItems] = useState([]);
  const [response, setResponse] = useState({});

  const getStore = async () => {
    try {
      const res = await axios.get("/api/store/" + props.user.store);
      setResponse(res.data.payload);
      setItems(res.data.payload.items);
      document.title = props.user.store
        ? "Welcome to - " + res.data.payload.name
        : "Create Your Own Store";
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStore();
  }, []);

  const deleteAnItem = item => {
    setItems(items.filter(e => e._id !== item._id));
  };

  const handleEdit = () => {
    props.history.push({
      pathname: "/create/store",
      state: {
        name: response.name,
        description: response.description
      }
    });
  };

  const DeleteStore = () => {
    if (
      window.confirm(
        "Are you sure you want to delete the store? You will lost all your items."
      )
    ) {
      props.deleteStore();
    }
  };

  const createdStore = () => (
    <div>
      <div>
        <h3>{response.name}</h3>
      </div>
      <div>
        <button
          title="Delete Store"
          style={{ right: window.innerWidth <= 800 ? 50 : 150 }}
          onClick={DeleteStore}
          className="btn btn-danger delete-store-button"
        >
          <i className="fas fa-trash-alt"></i>{" "}
          {window.innerWidth <= 800 ? "" : "Delete Store"}
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
        <Items payload={items} canEdit={true} del={deleteAnItem} />
        <button
          onClick={() => props.history.push("/create/item")}
          title="Create Item"
          className="btn btn-danger circle-button"
        >
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
  user: state.user.user
});

export default connect(
  mapStateToProps,
  {
    deleteStore
  }
)(withRouter(MyStore));
