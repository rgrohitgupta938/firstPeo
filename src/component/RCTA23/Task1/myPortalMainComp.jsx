import React, { Component } from "react";
import NavBar from "./navbar";
import { Redirect, Route, Switch } from "react-router-dom";
import Products from "./products";
import AddProduct from "./addProduct";
import Product from "./product";
import DeleteProduct from "./deleteProduct";
class MyPortalMainComp extends Component {
  render() {
    return (
      <div className="container">
        <NavBar />
        <Switch>
          <Route path="/products/:id/edit" component={AddProduct} />
          <Route path="/products/:id/delete" component={DeleteProduct} />
          <Route path="/products/add" component={AddProduct} />
          <Route path="/products/:id" component={Product} />
          <Route path="/products" component={Products} />
        </Switch>
      </div>
    );
  }
}
export default MyPortalMainComp;
