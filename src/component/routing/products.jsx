import React, { Component } from "react";
import { Link } from "react-router-dom";
class Products extends Component {
  render() {
    const { products, display } = this.props;
    const { value } = this.props.match.params;
    let products1 = display
      ? products.filter((pr) => pr[display] === value)
      : products;
    return (
      <div className="container">
        <h2>Welcome to my Products Page</h2>
        {products1.map((pr) => (
          <div className="row">
            <div className="col-3 border">
              <Link to={`/product/${pr.id}`}>{pr.id}</Link>
            </div>
            <div className="col-3 border">
              <Link to={`/brand/${pr.brand}`}>{pr.brand}</Link>
            </div>
            <div className="col-3 border">
              <Link to={`/category/${pr.category}`}>{pr.category}</Link>
            </div>
            <div className="col-3 border">{pr.product}</div>
          </div>
        ))}
      </div>
    );
  }
}
export default Products;
