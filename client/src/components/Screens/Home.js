import React, { useEffect } from "react";
import Items from "../layout/Items";

const Home = () => {
  useEffect(() => (document.title = "Welcome to Online Store"), []);
  return (
    <div>
      <Items payload={[]} />
    </div>
  );
};

export default Home;
