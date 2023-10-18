import React, { Component } from "react";
import { Link } from "react-router-dom";
class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg" style={{backgroundColor:"red"}}>
  <div className="container-fluid">
    <Link className="navbar-brand" to="/search" style={{fontSize:"30px",fontWeight:"bolder"}}>CustSys</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/customers" style={{color:"white",fontSize:"18px"}}>Show Customer</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/newCust" style={{color:"white",fontSize:"18px"}}>New Customers</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
    );
  }
}
export default NavBar;
