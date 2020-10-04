import React, { useEffect } from "react";
import "../../styles/loading.css";

const Loading = () => {
  useEffect(() => (document.title = "Loading..."), []);
  return (
    <div
      style={{ height: document.documentElement.scrollHeight }}
      className="loading-container"
    >
      <div className="center-it roller"></div>
      <div className="center-it loading-content">Loading...</div>
    </div>
  );
};

export default Loading;
