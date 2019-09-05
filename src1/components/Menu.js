import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

class Menu extends Component {
  render() {
    return (
      <Fragment>
        <div className="list-group list-group-flush">
        
          <Link to='/item'>
            <p className="list-group-item list-group-item-action bg-light" >
              <i className="fa fa-book fa-lg mr-4" aria-hidden="true" /> Food
            </p>
          </Link>

          <Link to='/history'>
            <p className="list-group-item list-group-item-action bg-light" >
              <i className="fa fa-book fa-lg mr-4" aria-hidden="true" /> History
            </p>
          </Link>

          <p
            href="#"
            className="list-group-item list-group-item-action bg-light"
          >
            <i className="fa fa-plus fa-lg mr-4" aria-hidden="true" /> Add Item
          </p>
          <Link to='/login'>
            <p className="list-group-item list-group-item-action bg-light">
              <i className="fa fa-sign-out fa-lg mr-4" aria-hidden="true" />{" "}
              <span style={{ color: "red" }}>Logout</span>
            </p>
          </Link>
        </div>
      </Fragment>
    );
  }
}

export default Menu;
