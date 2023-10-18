import React, { Component } from "react";
import NavBar from "./navbar";
import AllBrands from "./allBrands";
import Xiaomi from "./xiaomi";
import Samsung1 from "./samsung1";
import Realme from "./realme";
import Oppo from "./oppo";
import { Route, Switch,Redirect } from "react-router-dom";
class MainComponent extends Component {
  state = {
    mobiles: [
      { name: "Mi A1", brand: "Xiaomi", RAM: "4GB", ROM: "64GB", price: 9999 },
      {
        name: "Realme 2",
        brand: "Realme",
        RAM: "3GB",
        ROM: "32GB",
        price: 7999,
      },
      { name: "On5", brand: "Samsung", RAM: "3GB", ROM: "64GB", price: 8499 },
      { name: "F5", brand: "Oppo", RAM: "6GB", ROM: "128GB", price: 16999 },
      {
        name: "Mi A3",
        brand: "Xiaomi",
        RAM: "6GB",
        ROM: "128GB",
        price: 18999,
      },
      {
        name: "Realme 3",
        brand: "Realme",
        RAM: "4GB",
        ROM: "64GB",
        price: 9999,
      },
      { name: "On7", brand: "Samsung", RAM: "4GB", ROM: "64GB", price: 11999 },
      { name: "F7", brand: "Oppo", RAM: "6GB", ROM: "128GB", price: 18199 },
      {
        name: "RedMi 5",
        brand: "Xiaomi",
        RAM: "3GB",
        ROM: "32GB",
        price: 7499,
      },
      {
        name: "Realme Pro",
        brand: "Realme",
        RAM: "4GB",
        ROM: "64GB",
        price: 10299,
      },
      {
        name: "Galaxy 9",
        brand: "Samsung",
        RAM: "6GB",
        ROM: "128GB",
        price: 35999,
      },
      { name: "F3 Basic", brand: "Oppo", RAM: "3GB", ROM: "32GB", price: 8599 },
    ],
  };
  render() {
    const {mobiles} = this.state;
    return (
      <div className="container">
        <NavBar />
        <Switch>
          <Route
            path="/allBrands"
            render={(props) => <AllBrands {...props} mobiles = {mobiles} />}
          />
          <Route
            path="/xiaomi"
            render={(props) => <Xiaomi {...props} mobiles = {mobiles} />}
          />
          <Route
            path="/realme"
            render={(props) => <Realme {...props} mobiles = {mobiles} />}
          />
          <Route
            path="/oppo"
            render={(props) => <Oppo {...props} mobiles = {mobiles} />}
          />
          <Route
            path="/samsung1"
            render={(props) => <Samsung1 {...props} mobiles = {mobiles} />}
          />
          <Redirect from="/mobiles" to="/allBrands" />
        </Switch>
      </div>
    );
  }
}
export default MainComponent;
