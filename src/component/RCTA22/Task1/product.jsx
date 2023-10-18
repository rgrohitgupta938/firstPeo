import React, { Component } from "react";
import { Link } from "react-router-dom";
class Product extends Component {
  render() {
    const { id } = this.props.match.params;
    const { products } = this.props;
    let product = products.find((pr) => pr.id === id);
    return (
      <div className="container">
        Product Id : {id}
        <br />
        Brand : <Link to={`/brand/${product.brand}`}>{product.brand}</Link>
        <br />
        Category : <Link to={`/category/${product.category}`}>{product.category}</Link>
        <br />
        Name : {product.product}
        <br />
      </div>
    );
  }
}
export default Product;
