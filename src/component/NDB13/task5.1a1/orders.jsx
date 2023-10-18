import React, { Component } from "react";
import http from "./httpService";
class Orders extends Component {
  state = { orders: [], errMsg: "" };
  async componentDidMount() {
    this.getOrdersData();
  }
  async componentDidUpdate(prevProps, prevState) {
    if (this.props !== prevProps) this.getOrdersData();
  }
  async getOrdersData() {
    let { type } = this.props.match.params;
    let url = type === "my" ? "/myOrders" : "/allOrder";
    try {
      let response = await http.get(url);
      let { data } = response;
      console.log(data);
      this.setState({ orders: data, errMsg: null });
    } catch (ex) {
      console.log(ex.response);
      let errMsg = `${ex.response.status} ${ex.response.statusText}`;
      this.setState({ orders: [], errMsg: errMsg });
    }
  }
  render() {
    const { orders, errMsg } = this.state;
    return (
      <div className="container">
        <h4>Welcome to the Orders Page</h4>
        {errMsg && <h5>{errMsg}</h5>}
        {orders.map((ord) => (
          <div className="row" key={ord.orderId}>
            <div className="col-2 border">{ord.orderId}</div>
            <div className="col-2 border">{ord.userId}</div>
            <div className="col-2 border">{ord.qty}</div>
            <div className="col-2 border">{ord.value}</div>
          </div>
        ))}
      </div>
    );
  }
}
export default Orders;
