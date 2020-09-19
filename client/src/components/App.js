import React, { useState } from "react";
import "../styles/App.css";

import Login from "./LoginModal";

function App() {
  const [show, toggleShow] = useState(false);

  return (
    <div>
      <Login show={show} handleClose={() => toggleShow(false)} />
    </div>
  );
}

export default App;
