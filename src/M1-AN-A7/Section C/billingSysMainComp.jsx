import React, { Component } from "react";
import NavBar from "./navbar";
import DdComp from "./ddComp";
class BillingSysMainComp extends Component {
  state = {
    products: [
      {
        code: "PEP221",
        prod: "Pepsi",
        price: 12,
        instock: "Yes",
        category: "Beverages",
      },
      {
        code: "COK113",
        prod: "Coca Cola",
        price: 18,
        instock: "Yes",
        category: "Beverages",
      },
      {
        code: "MIR646",
        prod: "Mirinda",
        price: 15,
        instock: "No",
        category: "Beverages",
      },
      {
        code: "SLI874",
        prod: "Slice",
        price: 22,
        instock: "Yes",
        category: "Beverages",
      },
      {
        code: "MIN654",
        prod: "Minute Maid",
        price: 25,
        instock: "Yes",
        category: "Beverages",
      },
      {
        code: "APP652",
        prod: "Appy",
        price: 10,
        instock: "No",
        category: "Beverages",
      },
      {
        code: "FRO085",
        prod: "Frooti",
        price: 30,
        instock: "Yes",
        category: "Beverages",
      },
      {
        code: "REA546",
        prod: "Real",
        price: 24,
        instock: "No",
        category: "Beverages",
      },
      {
        code: "DM5461",
        prod: "Dairy Milk",
        price: 40,
        instock: "Yes",
        category: "Chocolates",
      },
      {
        code: "KK6546",
        prod: "Kitkat",
        price: 15,
        instock: "Yes",
        category: "Chocolates",
      },
      {
        code: "PER5436",
        prod: "Perk",
        price: 8,
        instock: "No",
        category: "Chocolates",
      },
      {
        code: "FST241",
        prod: "5 Star",
        price: 25,
        instock: "Yes",
        category: "Chocolates",
      },
      {
        code: "NUT553",
        prod: "Nutties",
        price: 18,
        instock: "Yes",
        category: "Chocolates",
      },
      {
        code: "GEM006",
        prod: "Gems",
        price: 8,
        instock: "No",
        category: "Chocolates",
      },
      {
        code: "GD2991",
        prod: "Good Day",
        price: 25,
        instock: "Yes",
        category: "Biscuits",
      },
      {
        code: "PAG542",
        prod: "Parle G",
        price: 5,
        instock: "Yes",
        category: "Biscuits",
      },
      {
        code: "MON119",
        prod: "Monaco",
        price: 7,
        instock: "No",
        category: "Biscuits",
      },
      {
        code: "BOU291",
        prod: "Bourbon",
        price: 22,
        instock: "Yes",
        category: "Biscuits",
      },
      {
        code: "MAR951",
        prod: "MarieGold",
        price: 15,
        instock: "Yes",
        category: "Biscuits",
      },
      {
        code: "ORE188",
        prod: "Oreo",
        price: 30,
        instock: "No",
        category: "Biscuits",
      },
    ],
    bill: [],
    sort: -1,
    filter: -1,
    new: -1,
  };
  handleAddToBill = (prd) => {
    let { code, prod, price } = prd;
    let s1 = { ...this.state };
    let inx = s1.products.findIndex((st) => st.code === code);
    let st = s1.bill.findIndex((prd) => prd.code === s1.products[inx].code);
    let st1 = { ...s1.products[inx], qty: 1 };
    let pr = st >= 0 ? (s1.bill[st].qty += 1) : s1.bill.push(st1);
    this.setState(s1);
  };
  sorting = (num) => {
    let s1 = { ...this.state };
    s1.sort = num;
    this.setState(s1);
  };
  handleFilter = (options) => {
    this.setState({ filter: options });
  };
  83;
  handleAddQty = (inx) => {
    let s1 = { ...this.state };
    let pr = s1.bill[inx];
    pr.qty += 1;
    s1.bill[inx] = pr;
    this.setState(s1);
  };
  handleNewBill = () => {
    let s1 = { ...this.state };
    s1.new = 0;
    this.setState(s1);
  };
  handleDecQty = (inx) => {
    let s1 = { ...this.state };
    let pr = s1.bill[inx];
    pr.qty = pr.qty === 1 ? this.handleRemove(inx) : (pr.qty -= 1);
    let str = pr.qty > 1 ? (s1.bill[inx] = pr) : "";
    this.setState(s1);
  };
  handleClearBill = () => {
    let s1 = { ...this.state };
    s1.bill = [];
    this.setState(s1);
    alert("Bill will be cleared");
  };
  handleRemove = (inx) => {
    let s1 = { ...this.state };
    s1.bill.splice(inx, 1);
    this.setState(s1);
  };
  render() {
    const { products, bill, sort, filter, options } = this.state;

    console.log(bill);
    console.log(filter);
    let { cat = "", instock = "", price = "" } = filter;
    let products1 =
      sort === 0
        ? products.sort((p1, p2) => p1.code.localeCompare(p2.code))
        : sort === 1
        ? products.sort((p1, p2) => p1.prod.localeCompare(p2.prod))
        : sort === 2
        ? products.sort((p1, p2) => p1.category.localeCompare(p2.category))
        : sort === 3
        ? products.sort((p1, p2) => +p1.price - +p2.price)
        : sort === 4
        ? products.sort((p1, p2) => p1.instock.localeCompare(p2.instock))
        : products;
    let products2 =
      cat !== "" ? products1.filter((prd) => prd.category === cat) : products1;
    products2 =
      instock !== ""
        ? products2.filter((prd) => prd.instock === instock)
        : products2;
    products2 =
      price !== ""
        ? products2.filter((prd) => {
            if (price.includes("-")) {
              let price1 = price.split("-");
              console.log(price);
              return prd.price >= price1[0] && prd.price <= price1[1];
            } else {
              let price1 = price.substring(1);
              let opt = price.substring(0, 1);
              return opt === "<" ? prd.price <= +price1 : prd.price >= +price1;
            }
          })
        : products2;

    console.log(products2);
    return (
      <div className="container">
        <NavBar onNewBill={this.handleNewBill} />
        <div className="row">
          <div className="col-12">
            <h3>Deatils of Current Bill</h3>
          </div>
          <div>
            Item: {bill.length} ,Quantity:{" "}
            {bill.reduce((acc, curr) => (acc += curr.qty), 0)} ,Amount :{" "}
            {bill.reduce((acc, curr) => (acc += curr.qty * curr.price), 0)}{" "}
            <br />
            {bill.length !== 0 && (
              <React.Fragment>
                {bill.map((bil, index) => (
                  <div className="row border">
                    <div className="col-6">
                      {bil.code} {bil.prod} Price :{bil.price} Quantity :{" "}
                      {bil.qty} Value : {bil.price * bil.qty}
                    </div>
                    <div className="col-6">
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => this.handleAddQty(index)}
                      >
                        +
                      </button>
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => this.handleDecQty(index)}
                      >
                        -
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => this.handleRemove(index)}
                      >
                        X
                      </button>
                    </div>
                  </div>
                ))}
              </React.Fragment>
            )}
          </div>
          {bill.length > 0 && (
            <div className="col-3">
              <button
                className="btn btn-primary btn-sm"
                onClick={() => this.handleClearBill()}
              >
                Clear Bill
              </button>
            </div>
          )}
        </div>
        <h4 className="text-center">Product List</h4>
        <div className="row">
          <div className="col-3">
            <strong>Filter Products By : </strong>
          </div>
          <div className="col-9">
            <DdComp
              products={products}
              filter={filter}
              onSubmit={this.handleFilter}
            />
          </div>
        </div>
        <div className="row text-white bg-dark border text-center">
          <div className="col-2" onClick={() => this.sorting(0)}>
            Code {sort === 0 ? "(X)" : ""}
          </div>
          <div className="col-2" onClick={() => this.sorting(1)}>
            Product {sort === 1 ? "(X)" : ""}
          </div>
          <div className="col-2" onClick={() => this.sorting(2)}>
            Category {sort === 2 ? "(X)" : ""}
          </div>
          <div className="col-2" onClick={() => this.sorting(3)}>
            Price {sort === 3 ? "(X)" : ""}
          </div>
          <div className="col-2" onClick={() => this.sorting(4)}>
            In Stock {sort === 4 ? "(X)" : ""}
          </div>
          <div className="col-2"></div>
        </div>
        {products2.map((prd, index) => {
          let { code, prod, price, instock, category } = prd;
          return (
            <React.Fragment>
              <div className="row border text-center">
                <div className="col-2">{code}</div>
                <div className="col-2">{prod}</div>
                <div className="col-2">{category}</div>
                <div className="col-2">{price}</div>
                <div className="col-2">{instock}</div>
                <div className="col-2">
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => this.handleAddToBill(prd)}
                  >
                    Add to Bill
                  </button>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    );
  }
}
export default BillingSysMainComp;
