import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavBar1 extends Component {
  render() {
    const {brands} = this.props;
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <Link className="navbar-brand ps-2" to="/">
          LAPTOPS
        </Link>
        <div className="" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
           {brands.map((br) => (
             <li className="nav-item">
             <Link className="nav-link" to={`/brand/${br}/1`}>
               {br}
             </Link>
           </li>
           ))}
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar1;
