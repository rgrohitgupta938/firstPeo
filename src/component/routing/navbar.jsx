import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <Link className="navbar-brand ps-2" to="/">
          Courses
        </Link>
        <div className="" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/course/React">
                React
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/course/Angular">
                Angular
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/course/Javascript">
                Javascript
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/stores1">
                Lectures
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
