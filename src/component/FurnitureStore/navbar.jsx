import React, { Component } from "react";
import { Link } from "react-router-dom";
class NavBar extends Component {
  render() {
    const { user } = this.props || {};
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <Link className="navbar-brand ps-2" to="/">
          Furniture Store
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/products">
                Products
              </Link>
            </li>
            {user && user.length !== 0 && user.role !== "admin" && (
              <li className="nav-item">
                <Link className="nav-link" to="/cart">
                  Cart
                </Link>
              </li>
            )}
            {user && user.length !== 0 && user.role === "admin" && (
              <li className="nav-item">
                <Link className="nav-link" to="/newProduct">
                  Add a New Product
                </Link>
              </li>
            )}
          </ul>
          <ul className="navbar-nav ms-auto">
            {!user && (
              <li className="nav-item">
                <Link className="nav-link" to="/signin">
                  Sign in
                </Link>
              </li>
            )}
            {user && user.length !== 0 && (
              <li className="nav-item">
                <Link className="nav-link" to="/signout">
                  Sign Out
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
