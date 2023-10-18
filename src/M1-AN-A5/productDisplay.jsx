import React, { Component } from "react";
import Products from "../component/routing/products";
class ProductDisplay extends Component {
  state = {
    productDetails: [
      { product: "Pepsi", sales: [2, 5, 8, 10, 5] },
      { product: "Coke", sales: [3, 6, 5, 4, 11, 5] },
      { product: "5Star", sales: [10, 14, 22] },
      { product: "Maggi", sales: [3, 3, 3, 3, 3] },
      { product: "Perk", sales: [1, 2, 1, 2, 1, 2] },
      { product: "Bingo", sales: [0, 1, 0, 3, 2, 6] },
      { product: "Gems", sales: [3, 3, 1, 1] },
    ],
    click: -1,
    showIndex: -1,
  };
  showSortProduct = () => {
    let s1 = { ...this.state };
    s1.click = -1;
    s1.productDetails.sort((p1, p2) => p1.product.localeCompare(p2.product));
    this.setState(s1);
  };
  showTotalSalesAcs = () => {
    let s1 = { ...this.state };
    s1.click = -1;
    s1.productDetails.sort((p1, p2) => {
      let total1 = p1.sales.reduce((n, m) => (n += m), 0);
      let total2 = p2.sales.reduce((n, m) => (n += m), 0);
      return total1 - total2;
    });
    this.setState(s1);
  };
  showTotalSalesDsc = () => {
    let s1 = { ...this.state };
    s1.click = -1;
    s1.productDetails.sort((p1, p2) => {
      let total1 = p1.sales.reduce((n, m) => (n += m), 0);
      let total2 = p2.sales.reduce((n, m) => (n += m), 0);
      return total2 - total1;
    });
    this.setState(s1);
  };
  showSalesDetails = (inx) => {
    let s1 = { ...this.state };
    s1.showIndex = inx;
    s1.click = 0;
    this.setState(s1);
  };

  render() {
    const { productDetails, click, showIndex } = this.state;
    let salesDetails = click ===0 ? productDetails[showIndex].sales : [];
    return (
      <div className="container">
       <div className="text-center">
       <button
          className="btn btn-primary m-2"
          onClick={() => this.showSortProduct()}
        >
          Sort by Product
        </button>
        <button
          className="btn btn-primary m-2"
          onClick={() => this.showTotalSalesAcs()}
        >
          Total Sales Asc
        </button>
        <button
          className="btn btn-primary m-2"
          onClick={() => this.showTotalSalesDsc()}
        >
          Total Sales Dsc
        </button>
       </div>
        <h2 className="text-center">Product Details</h2>
        <div className="row bg-dark text-white text-center fw-bold">
          <div className="col-4 border">Product</div>
          <div className="col-4 border">Total sales</div>
          <div className="col-4 border">Details</div>
        </div>
        {productDetails.map((prd, index) => {
          let { product, sales } = prd;
          return (
            <div className="row bg-light text-center">
              <div className="col-4 border text-center">{product}</div>
              <div className="col-4 border text-center">
                {sales.reduce((n, m) => (n += m), 0)}
              </div>
              <div className="col-4 border text-center">
                <button
                  className="btn btn-info btn-sm"
                  onClick={() => this.showSalesDetails(index)}
                >
                  Details
                </button>
              </div>
            </div>
          );
        })}
       {click ===  0 ? <h4 className="m-3">List of sales of {productDetails[showIndex].product}</h4> : ""}
        {click === 0
          ? salesDetails.map((k) => (
              <ul>
                <li>{k}</li>
              </ul>
            ))
          : ""}
      </div>
    );
  }
}
export default ProductDisplay;
