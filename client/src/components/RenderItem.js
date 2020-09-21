import React from "react";
import "../styles/item.css";

const RenderItem = props => {
  return (
    <div className="center-it render-items-container row">
      <div className="col-sm-6">
        <img src={"https://picsum.photos/350"} alt="Item" />
      </div>
      <div className="offset-sm-1 col-sm-5">
        <div>{/* Item Details */}</div>
      </div>
    </div>
  );
}

export default RenderItem;
