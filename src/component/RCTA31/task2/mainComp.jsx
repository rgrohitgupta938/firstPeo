import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import DisplayForm from "./deliveryFom";
import DisplayDetails from "./displayDeatils";
class MainComp extends Component {
  state = {
    deliveries: [
      {
        name: "Amit",
        gender: "Male",
        delivery: "Office",
        payments: ["CreditCard", "DebitCard"],
        slot: "2PM-6PM",
      },
      {
        name: "Pooja",
        gender: "Female",
        delivery: "PickUp",
        payments: ["NetBanking"],
        slot: "Before 10AM",
      },
      {
        name: "Vishal",
        gender: "Male",
        delivery: "Home",
        payments: ["CreditCard", "DebitCard"],
        slot: "2PM-6PM",
      },
    ],
  };
  handleSubmitDelivery = (person, index) => {
    const { deliveries } = this.state;
    let deliveries1 = [...deliveries];
    index ? (deliveries1[+index] = person) : deliveries1.push(person);
    this.setState({ deliveries: deliveries1 });
  };
  render() {
    const { deliveries } = this.state;
    return (
      <div className="container">
        <Switch>
          <Route
            path="/delivery/add"
            render={(props) => (
              <DisplayForm {...props} onSubmit={this.handleSubmitDelivery} />
            )}
          />
          <Route
            path="/delivery/:index/Edit"
            render={(props) => (
              <DisplayForm
                {...props}
                deliveries={deliveries}
                onSubmit={this.handleSubmitDelivery}
              />
            )}
          />
          <Route
            path="/deliveryDetails"
            render={(props) => (
              <DisplayDetails {...props} deliveries={deliveries} />
            )}
          />
          <Redirect from="/" to="/delivery/add" />
        </Switch>
      </div>
    );
  }
}
export default MainComp;
