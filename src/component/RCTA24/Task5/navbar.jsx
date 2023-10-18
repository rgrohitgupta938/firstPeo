import React, { Component } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
class NavBar extends Component {
  render() {
    let names = ["JS", "Angular", "React","Node"];
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <Link to="/" className="navbar-brand">
          Student Portal
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
              <Link className="nav-link" to="/students">
                Students
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/addStudent">
                Add a Student
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
                Courses
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                {names.map((n1) => (
                  <Link
                    key={n1}
                    className="dropdown-item"
                    to={`/students/courses/${n1}`}
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
