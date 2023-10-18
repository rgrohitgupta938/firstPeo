import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <Link className="navbar-brand ps-2" to="/">
          My Portal App
        </Link>
        <div className="" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/home">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contacts">
                Contacts
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/addProduct">
                Add Product
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/stores">
                Stores
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/addNewStore">
                Add Store
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
