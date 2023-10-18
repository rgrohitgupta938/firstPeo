import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./home";
import Contacts from "./contacts";
import Products from "./products";
import Product from "./product";
import NavBar from "./navbar";

class RMainComponent extends Component {
  state = {
    products: [
      {
        id: "A101",
        brand: "Pespi",
        category: "Beverages",
        product: "Pepsi 300ml",
      },
      {
        id: "A232",
        brand: "Coca Cola",
        category: "Beverages",
        product: "Diet Coke 300ml",
      },
      {
        id: "A102",
        brand: "Pespi",
        category: "Beverages",
        product: "Pepsi 500ml",
      },
      {
        id: "B036",
        brand: "Dairy Milk",
        category: "Chocolates",
        product: "Nutties 20g",
      },
      {
        id: "B173",
        brand: "Snickers",
        category: "Chocolates",
        product: "25g bar",
      },
    ],
    contact: {
      email: "mail@myportal.com",
      address: "402,4th Floor ,Tower D1",
    },
  };

  render() {
    const { contact, products } = this.state;
    return (
      <div className="container">
        <NavBar />
        <Switch>
          <Route
            path="/product/:id"
            render={(props) => <Product {...props} products={products} />}
          />
          <Route
            path="/brand/:value"
            render={(props) => <Products {...props} products={products} display="brand" />}
          />
          <Route
            path="/category/:value"
            render={(props) => <Products {...props} products={products} display="category" />}
          />
          <Route path="/home" component={Home} />
          <Route
            path="/contacts"
            render={(props) => <Contacts {...props} contact={contact} />}
          />
          <Route
            path="/products"
            render={(props) => <Products {...props} products={products} />}
          />
          <Redirect from="/" to="/home" />
        </Switch>
      </div>
    );
  }
}

export default RMainComponent;
