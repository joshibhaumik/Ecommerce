import React from "react";
// import "../../styles/App.css";

import Header from "./Header";

const Layout = ({ children, userId, storeId, auth }) => {
  return (
    <>
    {console.log(storeId)}
      <Header auth={auth} userId={userId} storeId={storeId} />
      <div className="online-store-container">{children}</div>
    </>
  );
}

export default Layout;
