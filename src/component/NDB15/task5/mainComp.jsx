import React, { Component } from "react";
import NavBar from "./navbar";
import Main from "./main";
import { Redirect, Route, Switch } from "react-router-dom";
import auth from "../../../services/authService";
import img1 from "./MyStore-sale.jpg";
import Cart from "./cart";
import Login from "./login";
import Logout from "./logout";
import MyOrders from "./myOrders";
import ManageProducts from "./manageProducts";
import AddProduct from "./addProduct";
import EditProduct from "./editProduct";
import OrderSummary from "./orderSummary";
import Thank from "./thank";
class MainComp extends Component {
  state = {
    cartItems: [],
    cartValue: "",
  };
  handleAddOrRemove = (productId, n) => {
    console.log(typeof n, n);
    if (n === 1) {
      this.setState((prevState) => {
        const updatedCartItems = [...prevState.cartItems];
        const index = updatedCartItems.findIndex((st) => st.id === +productId);
        if (index >= 0) {
          let item = updatedCartItems[index];
          let newItem = { ...item, qty: item.qty + 1 };
          updatedCartItems[index] = newItem;
          return { cartItems: updatedCartItems };
        } else {
          let item = { id: productId, qty: 1 };
          updatedCartItems.push(item);
          return { cartItems: updatedCartItems };
        }
      });
    } else
      this.setState((prevState) => {
        const updatedCartItems = [...prevState.cartItems];
        const index = updatedCartItems.findIndex((st) => st.id === +productId);
        let item = updatedCartItems[index];
        if (index >= 0 && item.qty > 1) {
          let newItem = { ...item, qty: item.qty - 1 };
          updatedCartItems[index] = newItem;
          return { cartItems: updatedCartItems };
        } else if (index >= 0) {
          updatedCartItems.splice(index, 1);
          return { cartItems: updatedCartItems };
        }
      });
  };
  render() {
    const user = auth.getUser();
    const { cartItems } = this.state;
    console.log(cartItems);
    return (
      <React.Fragment>
        <NavBar user={user} cartItems={cartItems} />
        <div className="container">
          <img
            src={img1}
            alt="MyStore Sale"
            width="100%"
            style={{ height: "200px" }}
          />
          <Switch>
            <Route
              path="/main/:category"
              render={(props) => (
                <Main
                  {...props}
                  cartItems={cartItems}
                  onAddOrRemove={this.handleAddOrRemove}
                />
              )}
            />
            <Route
              path="/main"
              render={(props) => (
                <Main
                  {...props}
                  cartItems={cartItems}
                  onAddOrRemove={this.handleAddOrRemove}
                />
              )}
            />
            <Route
              path="/cart"
              render={(props) => (
                <Cart
                  {...props}
                  cartItems={cartItems}
                  onAddOrRemove={this.handleAddOrRemove}
                />
              )}
            />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/myOrders" component={MyOrders} />
            <Route path="/manageProducts" component={ManageProducts} />
            <Route path="/addProduct" component={AddProduct} />
            <Route path="/product/:id" component={EditProduct} />
            <Route path="/orderSummary" component={OrderSummary} />
            <Route path="/thank" component={Thank} />
            <Redirect from="/" to="/main" />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}
export default MainComp;
