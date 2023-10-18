import React, { Component } from "react";
import { Link } from "react-router-dom";
class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg" style={{backgroundColor:"red"}}>
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/cars" style={{color:"white",fontSize:"18px"}}>Home</Link>
        </li>
      </ul>
      <ul className="navbar-nav" style={{marginLeft:"1300px"}}>
        <li className="nav-item">
          <Link className="nav-link" to="/newCar" style={{color:"white",fontSize:"18px"}}>New Car</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
    );
  }
}
export default NavBar;
