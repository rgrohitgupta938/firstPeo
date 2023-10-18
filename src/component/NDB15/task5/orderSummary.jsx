import React, { Component } from "react";
import auth from "../../../services/authService";
import http from "../../../services/httpService";
class OrderSummary extends Component {
  state = {
    data: [],
    userOrder: this.props.userOrder || {},
    orders: this.props.orders || [],
  };
  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log(name, value);
    const updatedUserOrder = {
      ...this.state.userOrder,
      [name]: value,
    };
    console.log(updatedUserOrder);
    this.setState({ userOrder: updatedUserOrder });
  };
  handleSubmit = () => {
    this.props.postOrder
      ? this.props.postOrder(this.state.userOrder)
      : this.postOrder(this.state.userOrder);
    localStorage.removeItem("orders");
    window.location = "/thank";
  };
  async componentDidMount() {
    if (auth.getUser().length !== 0 && !this.props.userOrder) {
      console.log("Hello 25F");
      await this.getOrders();
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.userOrder !== this.state.userOrder) {
      console.log("h1");
    }
  }
  getOrders = () => {
    console.log("in getorders");
    const user = auth.getUser();
    console.log(user);
    if (!this.props.userOrder) {
      const savedCart = localStorage.getItem("orders");
      if (savedCart) {
        let orders1 = JSON.parse(savedCart);
        console.log(orders1);
        const totalamount = orders1.reduce(
          (acc, curr) => acc + curr.cartValue,
          0
        );
        const newUserOrder = {
          userId: user.userId,
          email: user.email,
          items: orders1.length,
          name: "",
          address1: "",
          address2: "",
          city: "",
          totalamount: totalamount,
        };
        const orders = [...orders1];
        console.log(orders);
        this.setState(
          {
            userOrder: newUserOrder,
            orders: orders,
          },
          () => {
            console.log("This is state", this.state);
          }
        );
      }
    }
  };
  postOrder = async (obj) => {
    console.log(obj);
    let response = await http.post("/orders", obj);
    console.log(response);
  };
  render() {
    let { userOrder, orders } = this.state;
    let { name, address2, address1, city } = this.state.userOrder;
    console.log(typeof orders, typeof userOrder);
    return (
      <div className="container">
        <h3 className="text-center">Summary of your Order</h3>
        <h6 className="text-center">Your cart has {orders.length} items</h6>
        <div className="row text-center bg-secondary text-dark">
          <div className="col-4 text-center">Name</div>
          <div className="col-4 text-center">Quantity</div>
          <div className="col-4 text-center">Value</div>
        </div>
        {orders.map((order) => (
          <div className="row text-center border" key={order.id}>
            <div className="col-4 text-center">{order.name}</div>
            <div className="col-4 text-center">{order.qty}</div>
            <div className="col-4 text-center">{order.cartValue}</div>
          </div>
        ))}
        <div className="row text-center">
          <div className="col-4 text-center">Total</div>
          <div className="col-4 text-center"></div>
          <div className="col-4 text-center">
            {orders.reduce((acc, curr) => (acc += curr.cartValue), 0)}
          </div>
        </div>
        <h3 className="text-center">Delivery Details</h3>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={this.handleChange}
            placeholder=""
            value={name}
          />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            className="form-control"
            id="address1"
            name="address1"
            onChange={this.handleChange}
            placeholder="Enter Line1"
            value={address1}
          />
          <input
            type="text"
            className="form-control"
            id="address2"
            name="address2"
            onChange={this.handleChange}
            placeholder="Enter Line1"
            value={address2}
          />
        </div>
        <div className="form-group">
          <label>City</label>
          <input
            type="text"
            className="form-control"
            id="city"
            name="city"
            onChange={this.handleChange}
            placeholder="Enter Email Address"
            value={city}
          />
        </div>
        <button className="btn btn-primary btn-sm" onClick={this.handleSubmit}>
          Submit
        </button>
      </div>
    );
  }
}
export default OrderSummary;
