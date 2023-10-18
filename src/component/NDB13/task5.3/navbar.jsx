import React, { Component } from "react";
import { Link } from "react-router-dom";
class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <Link
          className="navbar-brand ps-2 text-dark"
          to="/"
        >
          <strong>hello</strong>
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/myDetails">
                My Details
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/myJunior">
                My Juniors
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/company">
                Company
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li>
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/logout">
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
