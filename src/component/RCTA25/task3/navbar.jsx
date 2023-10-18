import React, { Component } from "react";
import { Link } from "react-router-dom";
class NavBar extends Component {
  render() {
    const { user } = this.props;
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-warning">
        <Link
          className="navbar-brand ps-2 text-dark"
          to={
            user
              ? user.role === "manager"
                ? "/admin"
                : user.role === "customer"
                ? "customer"
                : ""
              : "/login"
          }
        >
          Home
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto">
            {!user && (
              <li>
                <Link className="nav-link text-dark" to="/login">
                  Login
                </Link>
              </li>
            )}
            {user && user.role === "customer" ? (
              <li className="nav-item dropdown">
                <Link
                  className="nav-link text-dark dropdown-toggle"
                  to="/customer"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  View
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/viewCheque">
                      Cheque
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/viewNet">
                      Net banking
                    </Link>
                  </li>
                </ul>
              </li>
            ) : (
              ""
            )}
            {user && user.role === "customer" ? (
              <li className="nav-item dropdown">
                <Link
                  className="nav-link text-dark dropdown-toggle"
                  to="/customer"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Details
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/customerDetails">
                      Customer
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/nomineeDetails">
                      Nominee
                    </Link>
                  </li>
                </ul>
              </li>
            ) : (
              ""
            )}
            {user && user.role === "customer" ? (
              <li className="nav-item dropdown">
                <Link
                  className="nav-link text-dark dropdown-toggle"
                  to="/customer"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Transaction
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/addPayee">
                      Add Payee
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/cheque">
                      Cheque
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/netBanking">
                      NetBanking
                    </Link>
                  </li>
                </ul>
              </li>
            ) : (
              ""
            )}
            {user && user.role === "manager" ? (
              <li className="nav-item dropdown">
                <Link
                  className="nav-link text-dark dropdown-toggle"
                  to="/admin"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Customers
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/addCustomer">
                      Add Customer
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/allCustomers">
                      View All Customers
                    </Link>
                  </li>
                </ul>
              </li>
            ) : (
              ""
            )}
            {user && user.role === "manager" ? (
              <li className="nav-item dropdown">
                <Link
                  className="nav-link text-dark dropdown-toggle"
                  to="/emp"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Transaction
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/allCheques">
                      Cheques
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/allNet">
                      Net Banking
                    </Link>
                  </li>
                </ul>
              </li>
            ) : (
              ""
            )}
          </ul>
          <ul className="navbar-nav">
            {user && (
              <li className="nav-link text-dark">Welcome {user.name}</li>
            )}
            {user && (
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/logout">
                  Logout
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
