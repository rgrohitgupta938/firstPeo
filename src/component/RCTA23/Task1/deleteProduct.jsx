import React, { Component } from "react";
import http from "./httpService";
class DeleteProduct extends Component {
  async componentDidMount() {
    const { id = "" } = this.props.match.params;
    let response = http.deleteApi(`/productApp/products/${id}`);
    console.log("hiiiiii00");
    this.props.history.push("/products");
  }
  render() {
    return "";
  }
}
export default DeleteProduct;
