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
              Mobile Sys
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
                  <Link className="nav-link active" aria-current="page" to="/mobile">
                    Mobile
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
                    Brands
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="/mobile/brand/Samsung">
                        Samsung
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/mobile/brand/Xiaomi">
                        Xiaomi
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/mobile/brand/Realme">
                        Realme
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/mobile/brand/Apple">
                        Apple
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
                    RAM
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="/mobile/RAM/3GB">
                        3GB
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/mobile/RAM/4GB">
                        4GB
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/mobile/RAM/6GB">
                        6GB
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/mobile/RAM/8GB">
                        8GB
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
                    ROM
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="/mobile/ROM/32GB">
                        32GB
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/mobile/ROM/64GB">
                        64GB
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/mobile/ROM/128GB">
                        128GB
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/mobile/ROM/256GB">
                        256GB
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
                    OS
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="/mobile/OS/Android">
                        Android
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/mobile/OS/iOS">
                        iOS
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/newMobile">
                    New Mobile
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
