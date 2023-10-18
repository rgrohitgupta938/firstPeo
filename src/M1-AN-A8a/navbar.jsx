import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";

class NavBar extends Component {
  state = {
    leftPanelCh:this.props.leftPanelCh,
  }
  render() {
    const {entries} = this.props.leftPanelCh;
    return (
      <nav className="navbar navbar-expand-lg bg-white navbar-white">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
          <FontAwesomeIcon icon={faBookOpen} size="2xl" style={{color: "#000000",}} />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  className="nav-link text-dark fw-bold"
                  to={`/books?q=harry%20potter&startIndex=0&maxResults=${+entries}`}
                >
                  Harry Potter
                </Link>
              </li>
              <li className="nav-item text-dark fw-bold">
                <Link
                  className="nav-link"
                  to={`/books?q=Agatha Christie&startIndex=0&maxResults=${+entries}`}
                >
                  Agatha Christie
                </Link>
              </li>
              <li className="nav-item text-dark fw-bold">
                <Link
                  className="nav-link"
                  to={`/books?q=Premchand&startIndex=0&maxResults=${+entries}`}
                >
                  Premchand
                </Link>
              </li>
              <li className="nav-item text-dark fw-bold">
                <Link
                  className="nav-link"
                  to={`/books?q=Jane Austen&startIndex=0&maxResults=${+entries}`}
                  >
                  Jane Austen
                </Link>
              </li>
              <li className="nav-item text-dark fw-bold">
                <Link
                  className="nav-link"
                  to="/mybooks"
                  >
                  My Books
                </Link>
              </li>
              <li className="nav-item text-dark fw-bold">
                <Link
                  className="nav-link"
                  to="/settings"
                  >
                  Settings
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
export default NavBar;
