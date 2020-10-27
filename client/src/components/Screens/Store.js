import React, { useEffect, useState } from "react";
import "../../styles/store.css";
import Items from "../layout/Items";
import axios from "axios";

const Store = props => {
  const [response, setResponse] = useState({});

  const getStore = async () => {
    const { storeId } = props.match.params;
    const res = await axios.get("/api/store/" + storeId);
    setResponse(res.data.payload);
    document.title = "Welcome to - " + res.data.payload.name;
  };

  useEffect(() => {
    getStore();
  }, []);

  const StoreInfo = () => (
    <div>
      <div>
        <h3>{response.name}</h3>
      </div>
      <div className="store-contains">
        <Items payload={response.items} />
      </div>
    </div>
  );

  const DoesNotExists = () => (
    <div className="p-5">
      <p className="text-muted" style={{ fontSize: 30 }}>
        Store Does Not Exists
      </p>
    </div>
  );

  return StoreInfo();
};

export default Store;
