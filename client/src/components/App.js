import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "../styles/App.css";

import Login from "./LoginModal";

function App() {
  const [show, toggleShow] = useState(true);

  return (
    <div>
      <Login show={show} handleClose={() => toggleShow(false)} />
    </div>
  );
}

export default App;
