import React, { Component } from "react";
import { Link } from "react-router-dom";
import auth from "../../../services/authService";
class NavBar extends Component {
  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      console.log(this.props);
    }
  }
  getNumItem = () => {
    const { cartItems } = this.props;
    let orders = localStorage.getItem("orders")
      ? JSON.parse(localStorage.getItem("orders"))
      : [];
    let num = cartItems
      ? cartItems.reduce((acc, curr) => (acc = curr.qty + acc), 0)
      : orders.reduce((acc, curr) => (acc = curr.qty + acc), 0);
    return num;
  };
  render() {
    let { user, cartItems } = this.props;
    console.log(cartItems);
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <Link className="navbar-brand ps-2" to="/">
          MyStore
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/main/Watches">
                Watches
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/main/Sunglasses">
                Sunglasses
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/main/Belts">
                Belts
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/main/Handbags">
                Handbags
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="/admin"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Footwear
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/main/Formal Shoes">
                    Formal Shoes
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/main/Sport Shoes">
                    Sport Shoes
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/main/Floaters">
                    Floaters
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/main/Sandals">
                    Sandals
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
          <ul className="navbar-nav">
            {!user && (
              <li>
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            )}
            {user && (
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="/admin"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {auth.getUser().email}
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/myOrders">
                      My Orders
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/manageProducts">
                      Manage Poducts
                    </Link>
                  </li>
                  <hr></hr>
                  <li>
                    <Link className="dropdown-item" to="/logout">
                      Logout
                    </Link>
                  </li>
                </ul>
              </li>
            )}
            <li className="nav-item me-4">
              <Link className="nav-link" to="/cart">
                Cart
              </Link>
            </li>
            <div className="cart-pill">{this.getNumItem()}</div>
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
