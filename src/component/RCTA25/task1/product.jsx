import React, { Component } from "react";
import http from "../../../services/httpService";
class Product extends Component {
  state = {
    product: {},
  };

  async componentDidMount() {
    let { id } = this.props.match.params;
    let response = await http.get(`/productApp/products/${id}`);
    let { data } = response;
    console.log(data);
    this.setState({ product: data });
  }
  render() {
    const { product } = this.state;
    return (
      <div className="container">
        Product Id : {product.id}
        <br />
        Name : {product.name}
        <br />
        Price : {product.price}
        <br />
      </div>
    );
  }
}
export default Product;
