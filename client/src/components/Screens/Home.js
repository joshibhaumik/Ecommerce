import React, { useEffect, useState } from "react";
import axios from "axios";
import Items from "../layout/Items";

const Home = () => {

  const [ response, setResponse ] = useState([]);

  const getItems = async () => {
    try {
      const response = await axios.get("/api/items/get");
      setResponse(response.data.payload);
      document.title = "Welcome to Online Store"
      console.log(response.data.payload);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getItems();
  }, []);
  return (
    <div>
      <Items payload={response} />
    </div>
  );
};

export default Home;
