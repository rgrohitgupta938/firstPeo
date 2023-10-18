import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavBar extends Component {
  render() {
    const { user } = this.props;
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <Link className="navbar-brand ps-2" to="/">
          Employee Portal
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto">
            {user && user.role === "ADMIN" && (
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="/admin"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Admin
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/admin/addEmp">
                      Add Employee
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/admin/viewemp">
                      View Employee
                    </Link>
                  </li>
                </ul>
              </li>
            )}
            {user && user.role === "EMPLOYEE" && (
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="/emp"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  My Portal
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/emp/contact">
                      Contact Details
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/bills">
                      Bills
                    </Link>
                  </li>
                </ul>
              </li>
            )}
          </ul>
          <ul className="navbar-nav">
            {!user && (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            )}
            {user && (
              <li className="nav-item">
                <Link className="nav-link" to="/logout">
                  Logout
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
