import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <Link className="navbar-brand ps-2" to="/mobiles">
          Mobiles
        </Link>
        <div className="" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/allBrands">
                All Brands
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/xiaomi">
                Xiaomi
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/samsung1">
                Samsung
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/realme">
                Realme
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/oppo">
                Oppo
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
