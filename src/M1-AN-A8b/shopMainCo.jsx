import React, { Component } from "react";
import NavBar from "./navbar";
import { Route, Switch } from "react-router-dom";
import ShopView from "./shopView";
import ProdView from "./prodView";
import PurchaseView from "./purchaseView";
import AddShop from "./addShop";
import AddProd from "./addProd";
class ShopMainCo extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <div className="conatiner">
          <Switch>
            <Route path="/shops/view/:id" component={ShopView} />
            <Route path="/shops/view" component={ShopView} />
            <Route path="/products/view/:id" component={ProdView} />
            <Route path="/products/view" component={ProdView} />
            <Route path="/purchases" component={PurchaseView} />
            <Route path="/addShop" component={AddShop} />
            <Route path="/addProd/:id" component={AddProd} />
            <Route path="/addProd" component={AddProd} />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}
export default ShopMainCo;
