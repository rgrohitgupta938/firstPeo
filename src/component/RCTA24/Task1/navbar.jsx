import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <Link className="navbar-brand ps-2" to="/">
          BookSite
        </Link>
        <div className="d-flex" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/books?newarrival=yes">
                New Arrivals
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/books/children?page=1">
                Children
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/books/fiction">
                Fiction
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/books/mystery">
                Mystery
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/books/management">
                Management
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/books">
                All Books
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav" style={{marginLeft:"550px"}}>
          <li className="nav-item">
              <Link className="nav-link" to="/book/new">
                New Book
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
