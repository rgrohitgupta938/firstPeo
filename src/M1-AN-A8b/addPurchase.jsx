import React, { Component } from "react";
import http from "./httpService";
class AddProd extends Component {
  state = {
    purchase: {
      purchaseid: "",
      shopid: "",
      productid: "",
      quntity: "",
      price: "",
    },
    edit: false,
    editID: "",
  };
  async componentDidMount() {
    this.fetchData();
  }
  async fetchData() {
    const { id } = this.props.match.params;
    if (+id) {
      let response = await http.get(`/svr/purchases/${+id}`);
      let { data } = response;
      console.log("if", data);
      let emp = {
        purchaseid: data[0].purchaseid,
        shopid: data[0].shopid,
        productid: data[0].productid,
        quantity: data[0].quntity,
        price: data[0].price,
      };
      console.log(emp);
      this.setState({ product: emp, edit: true, editID: id }, () => {
        console.log(this.state.product || 0);
      });
    } else {
      let purchase = {
        purchaseid: "",
        shopid: "",
        productid: "",
        quntity: "",
        price: "",
      };
      this.setState({ purchase: purchase, edit: false });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.fetchData();
    }
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      purchase: {
        ...prevState.purchase,
        [name]: value,
      },
    }));
  };
  async postData(url, obj) {
    console.log(obj);
    let response = await http.post(url, obj);
    console.log(response);
    this.props.history.push("/purchases");
  }
  async putData(url, obj) {
    let response = await http.put(url, obj);
    console.log(response);
    this.props.history.push("/purchases");
  }
  handleSubmit = (e) => {
    e.preventDefault();
    let { purchase, edit, editID } = this.state;
    edit
      ? this.putData(`/svr/purchases/${editID}`, purchase)
      : this.postData("/svr/purchases", purchase);
  };
  render() {
    let { purchaseid, shopid, productid, price, quantity } = this.state.product;
    return (
      <div className="container">
        <div className="form-group">
          <label>Purchase Id</label>
          <input
            type="number"
            className="form-control"
            id="purchaseid"
            name="purchaseid"
            onChange={this.handleChange}
            placeholder="Enter Purchase Id"
            value={purchaseid}
          />
        </div>
        <div className="form-group">
          <label>Shop Id</label>
          <input
            type="number"
            className="form-control"
            id="shopid"
            name="shopid"
            onChange={this.handleChange}
            placeholder="Enter Shop Id"
            value={shopid}
          />
        </div>
        <div className="form-group">
          <label>Product Id</label>
          <input
            type="number"
            className="form-control"
            id="productid"
            name="productid"
            onChange={this.handleChange}
            placeholder="Enter Product Id"
            value={productid}
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            onChange={this.handleChange}
            placeholder="Enter Price"
            value={price}
          />
        </div>
        <div className="form-group">
          <label>Quantity</label>
          <input
            type="number"
            className="form-control"
            id="quantity"
            name="quantity"
            onChange={this.handleChange}
            placeholder="Enter Quantity"
            value={quantity}
          />
        </div>
        <button className="btn btn-primary" onClick={this.handleSubmit}>
          Submit
        </button>
      </div>
    );
  }
}
export default AddProd;
