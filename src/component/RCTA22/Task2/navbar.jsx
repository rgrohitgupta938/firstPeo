import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <Link className="navbar-brand ps-2" to="/jobs">
          Job Sys
        </Link>
        <div className="" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/jobs/react1/1">
                React
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/jobs/angular/1">
                Angular
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/jobs/android/1">
                Android
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
