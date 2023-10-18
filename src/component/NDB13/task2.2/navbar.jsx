import React, { Component } from "react";
import { Link } from "react-router-dom";
class NavBar extends Component {
  render() {
    const { user } = this.props;
    console.log(user);
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-success">
        <Link
          className="navbar-brand ps-2 text-dark"
          to={user ? "/main" : "/login"}
        >
          <strong>hello</strong>
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto">
            {user && (
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/myDetails">
                  My Details
                </Link>
              </li>
            )}
            {user && (
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/myJunior">
                  My Juniors
                </Link>
              </li>
            )}
            {user && (
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/company">
                  Company
                </Link>
              </li>
            )}
            {user && (
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/tracker">
                  Tracker
                </Link>
              </li>
            )}
          </ul>
          <ul className="navbar-nav">
            {!user && (
              <li>
                <Link className="nav-link text-dark" to="/login">
                  Login
                </Link>
              </li>
            )}
            {user && (
              <li className="nav-link text-dark">Welcome {user.name}</li>
            )}
            {user && (
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/logout">
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
