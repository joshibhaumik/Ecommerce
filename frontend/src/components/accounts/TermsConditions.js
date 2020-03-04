import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class TermsConditions extends Component {
  render() {
    return (
      <div className="row justify-content-center mt-5">
        <div className="card text-white mb-3 mx-5" style={{ "max-width": "200rem" }}>
          <div className="card-header bg-primary">Terms & Conditions</div>
          <div className="card-body">
            <p className="card-text text-dark">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil,
              possimus. Quo doloremque tempora itaque quod nostrum omnis
              voluptatum sapiente, molestias saepe ducimus dolores corrupti
              earum nam at illum facilis id, est minus, consequuntur ipsam modi
              dicta atque reprehenderit deleniti? Repellat, possimus suscipit!
              Nam excepturi eos officiis impedit expedita beatae velit a dolorem
              est sunt et suscipit doloremque nisi aspernatur earum optio quasi
              fuga commodi minima voluptate sequi pariatur enim, placeat
              laudantium. Soluta sunt distinctio necessitatibus pariatur nam,
              esse quis quisquam animi id rerum delectus molestias, veniam
              consequatur nihil officia ducimus et eveniet aspernatur nostrum
              fuga aut molestiae, cumque explicabo tempore?
            </p>
            <NavLink to="/register" className="btn btn-primary">Goto Registers Page!</NavLink>
          </div>
        </div>
      </div>
    );
  }
}

export default TermsConditions;
