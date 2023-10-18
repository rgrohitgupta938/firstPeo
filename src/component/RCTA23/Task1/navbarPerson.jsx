import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavBarPerson extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <Link className="navbar-brand ps-2" to="/">
          My Portal
        </Link>
        <div className="" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/products">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products/add">
                Add Product
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBarPerson;
