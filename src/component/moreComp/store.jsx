import React, { Component } from "react";
import Product from "./product";
import ProductTable from "./productTable";
class Store extends Component {
  state = {
    products: [
      { name: "Coca Cola", code: "C332", price: 20, qty: 10 },
      { name: "5Star", code: "F168", price: 15, qty: 0 },
      { name: "Maggi", code: "M228", price: 28, qty: 22 },
      { name: "Pepsi", code: "P288", price: 20, qty: 18 },
      { name: "Dairy Milk", code: "D311", price: 40, qty: 0 },
      { name: "Mirinda", code: "M301", price: 25, qty: 8 },
      { name: "Kitkat", code: "K477", price: 16, qty: 11 },
      { name: "Red Bull", code: "R544", price: 90, qty: 3 },
    ],
    viewGrid: false,
  };

  handleIncrease = (inx) => {
    let s1 = {...this.state};
    s1.products[inx].qty+=1;
    this.setState(s1);
  }
  handleDecrease = (inx) => {
    let s1 = {...this.state};
    s1.products[inx].qty-=1;
    this.setState(s1);
  }
  sortQty = () => {
    let s1 = {...this.state};
    let st = s1.products.sort((p1,p2) => p1.qty-p2.qty);
    s1.products = st;
    this.setState(s1);
  }
  sortPrice = () => {
    let s1 = {...this.state};
    let st = s1.products.sort((p1,p2) => p1.price-p2.price);
    s1.products = st;
    this.setState(s1);
  }
  chngView = () => {
    this.setState({
        viewGrid: !this.state.viewGrid
      });
  }

  render() {
    const { products,viewGrid } = this.state;
    return (
      <div className="container text-center">
        <h5 className="text-center">Products in Store</h5>
        <button className="btn btn-primary m-2 text-center" onClick={()=>this.sortQty()}>Order By Quantity</button>
        <button className="btn btn-primary m-2 text-center" onClick={()=>this.sortPrice()}>Order By Price</button>
        <button className="btn btn-primary m-2 text-center" onClick={()=>this.chngView()}>View :{!viewGrid ? " Grid" : " Table"} </button>
        { !viewGrid ? <div className="row m-2">
        <div className="col-4 text-center bg-dark text-white">Name</div>
        <div className="col-1 text-center bg-dark text-white">Code</div>
        <div className="col-1 text-center bg-dark text-white">Price</div>
        <div className="col-2 text-center bg-dark text-white">Quantity</div>
        <div className="col-2 text-center bg-dark text-white"></div>
        <div className="col-2 text-center bg-dark text-white"></div>
        </div> : ""}
        <div className="row m-2">
        {products.map((k,index) => (
          !viewGrid ? <ProductTable prod = {k} index = {index} onIncrease={this.handleIncrease} onDecrease={this.handleDecrease} /> 
          : <Product prod = {k} index = {index} onIncrease={this.handleIncrease} onDecrease={this.handleDecrease} />
        ))}
        </div>
      </div>
    );
  }
}
export default Store;
