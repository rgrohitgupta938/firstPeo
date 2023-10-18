import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
class NavBar extends Component {
  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              Employee Sys
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/employees">
                    Employee
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="/dept"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Departments
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="/employees/dept/Finance">
                        Finance
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/employees/dept/HR">
                        HR
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/employees/dept/Marketing">
                        Marketing
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/employees/dept/Operations">
                        Operations
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/employees/dept/Technology">
                        Technology
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Designations
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="/employees/desig/Manager">
                        Manager
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/employees/desig/VP">
                        VP
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/employees/desig/Trainee">
                        Trainee
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/newEmployees">
                    New Employee
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}
export default NavBar;
