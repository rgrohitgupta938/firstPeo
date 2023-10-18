import React, { Component } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
class NavBar extends Component {
  render() {
    let names = ["George", "Carla", "Tim"];
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <Link to="/" className="navbar-brand">
          Component LifeCycle Example
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/compA">
                AAAA
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                BBBB
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                {names.map((n1) => (
                  <Link
                    key={n1}
                    className="dropdown-item"
                    to={`/compB/${n1}`}
                  >
                    {n1}
                  </Link>
                ))}
              </div>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
