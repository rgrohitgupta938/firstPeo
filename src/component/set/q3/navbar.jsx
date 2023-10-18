import React, { Component } from "react";
import { Link } from "react-router-dom";
class NavBar extends Component {
  render() {
    const { onSearchChange, onPressEnter } = this.props;
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <Link className="navbar-brand ps-2" to="/">
          My Messages
        </Link>
        <div className="" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <input
                type="text"
                className="form-control tx-text ms-5"
                placeholder="Search"
                onChange={onSearchChange}
                onKeyDown={onPressEnter}
              />
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
export default NavBar;
