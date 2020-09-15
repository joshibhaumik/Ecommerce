import React, { useEffect, useState } from "react";
import axios from "axios";

import "../styles/App.css";

function App() {
  const [message, setMessage] = useState("");
  const [loading, toggleLoading] = useState(true);
  useEffect(() => {
    document.title = "Welcome";
    axios.get("/api/").then(e => {
      setMessage(e.data.message);
      toggleLoading(false);
    });
  }, []);
  return <div>{loading ? "Loading..." : message}</div>;
}

export default App;
