import React, { Component } from "react";
import NavBar from "./navbar";
import auth from "../../services/authService";
import { Route, Switch } from "react-router-dom";
import Products from "./products";
import signIn from "./signIn";
import Logout from "./logout";
import Cart from "./cart";
import NewProduct from "./newProduct";
class MainComp extends Component {
  render() {
    const user = auth.getUser();
    return (
      <React.Fragment>
        <NavBar user={user} />
        <div className="container">
          <Switch>
            <Route
              path="/products/:category/:code"
              render={(props) => <Products {...props} />}
            />
            <Route
              path="/products/:category"
              render={(props) => <Products {...props} />}
            />
            <Route path="/products" component={Products} />
            <Route path="/signin" component={signIn} />
            <Route path="/signout" component={Logout} />
            <Route path="/cart" component={Cart} />
            <Route path="/newProduct/:prodCode" component={NewProduct} />
            <Route path="/newProduct" component={NewProduct} />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}
export default MainComp;
