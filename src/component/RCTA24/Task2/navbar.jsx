import React, { Component } from "react";
import { Link } from "react-router-dom";
class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg" style={{backgroundColor:"red"}}>
  <div className="container-fluid">
    <Link className="navbar-brand" to="/search" style={{fontSize:"30px",fontWeight:"bolder"}}>NewsSite</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/search?q=sports&api-key=test" style={{color:"white",fontSize:"18px"}}>Sports</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/search?q=cricket&api-key=test" style={{color:"white",fontSize:"18px"}}>Cricket</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/search?q=movies&api-key=test" style={{color:"white",fontSize:"18px"}}>Movies</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/search?q=education&api-key=test" style={{color:"white",fontSize:"18px"}}>Education</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
    );
  }
}
export default NavBar;
