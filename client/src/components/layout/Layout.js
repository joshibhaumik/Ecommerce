import React from "react";
// import "../../styles/App.css";

import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="online-store-container">{children}</div>
    </>
  );
}

export default Layout;
