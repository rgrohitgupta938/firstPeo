import React, { Component } from "react";
import Product from "./product";
class Store extends Component {
  state = {
    products: [
      { name: "Coca Cola", code: "C332", price: 20, quantity: 10 },
      { name: "5Star", code: "F168", price: 15, quantity: 0 },
      { name: "Maggi", code: "M228", price: 28, quantity: 22 },
      { name: "Pepsi", code: "P288", price: 20, quantity: 18 },
      { name: "Dairy Milk", code: "D311", price: 40, quantity: 0 },
      { name: "Mirinda", code: "M301", price: 25, quantity: 8 },
      { name: "Kitkat", code: "K477", price: 16, quantity: 11 },
      { name: "Red Bull", code: "R544", price: 90, quantity: 3 },
    ],
  };
  handleIncDec = (n, code) => {
    console.log(n, code);
    let products = this.state.products;
    let prod = products.find((p) => p.code === code);
    console.log(prod);
    prod.quantity = prod.quantity + n;
    this.setState({ products: products });
  };
  render() {
    const products = this.state.products;
    return (
      <div className="container">
        <Product products={products} onCLickQty={this.handleIncDec} />
      </div>
    );
  }
}
export default Store;
