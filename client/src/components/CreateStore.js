import React from "react";
import "../styles/store.css";

const CreateStore = () => {
  return (
    <div className="center-it create-store-form-container">
      <h3 style={{ textAlign: "center" }}>Create Your own Store?</h3>
      <input placeholder="Enter Store Name" />
      <input placeholder="Description of the Store" />
    </div>
  );
}

export default CreateStore;
