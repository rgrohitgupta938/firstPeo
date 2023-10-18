import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import ShoppingList from "./shoppingList";
import ShoppingForm from "./shoppingForm";
class MainComp extends Component {
  state = {
    lists: [
      {
        name: "List1",
        items: [
          { item: "Colgate", qty: 1 },
          { item: "Pepsi", qty: 7 },
          { item: "Maggi", qty: 4 },
        ],
      },
      {
        name: "List2",
        items: [
          { item: "Nutties", qty: 1 },
          { item: "Coca Cola", qty: 5 },
        ],
      },
    ],
  };
  handleSubmitList = (list, index = "") => {
    const { lists } = this.state;
    let lists1 = [...lists];
    index ? (lists1[+index] = list) : lists1.push(list);
    this.setState({ lists: lists1 });
  };
  render() {
    const { lists } = this.state;
    return (
      <div className="container">
        <Switch>
          <Route
            path="/shoppingList/:index/edit"
            render={(props) => (
              <ShoppingForm
                {...props}
                lists={lists}
                onSubmit={this.handleSubmitList}
              />
            )}
          />
          <Route
            path="/shoppingList/add"
            render={(props) => (
              <ShoppingForm {...props} onSubmit={this.handleSubmitList} />
            )}
          />
          <Route
            path="/shoppingList"
            render={(props) => <ShoppingList {...props} lists={lists} />}
          />

          <Redirect from="/" to="/shoppingList" />
        </Switch>
      </div>
    );
  }
}
export default MainComp;
