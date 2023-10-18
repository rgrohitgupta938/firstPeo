import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <Link className="navbar-brand ps-2" to="/">
          SportStar
        </Link>
        <div className="" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/stars">
                All
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/stars/cricket">
                Cricket
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/stars/football">
                Football
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/stars/new">
                Add Star
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
