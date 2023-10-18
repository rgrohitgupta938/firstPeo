import React, { Component } from "react";
import { Link } from "react-router-dom";
class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/search" >MyCompany</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/emps">All</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/emps/New Delhi">New Delhi</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/emps/Noida">Noida</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
    );
  }
}
export default NavBar;
