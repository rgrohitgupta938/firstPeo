import React, { Component } from "react";
import http from "../../../services/httpService";
class MyOrders extends Component {
  state = {
    data: [],
  };
  async fecthOrders() {
    let response = await http.get("/orders");
    let { data } = response;
    this.setState({ data: data });
  }
  componentDidMount() {
    this.fecthOrders();
  }
  render() {
    const { data } = this.state;
    return (
      <div className="container">
        <h4>List of Orders</h4>
        <div className="row text-white bg-dark p-1">
          <div className="col-2">Name</div>
          <div className="col-2">City</div>
          <div className="col-4">Address</div>
          <div className="col-2">Amount</div>
          <div className="col-2">Items</div>
        </div>
        {data.map((or) => (
          <div className="row border" key={or.id}>
            <div className="col-2">{or.name}</div>
            <div className="col-2">{or.city}</div>
            <div className="col-4">{or.address1}</div>
            <div className="col-2">{or.totalamount}</div>
            <div className="col-2">{or.items}</div>
          </div>
        ))}
      </div>
    );
  }
}
export default MyOrders;
