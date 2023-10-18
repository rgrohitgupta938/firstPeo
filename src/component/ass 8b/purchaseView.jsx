import React, { Component } from "react";
import http from "./httpService";
import queryString from "query-string";
import LeftPanel from "./leftPanel";
class PurchaseView extends Component {
  state = {
    purchases: [],
    products: [],
    shops: [],
    sortOpt: ["QtyAsc", "QtyDesc", "ValueAsc", "ValueDesc"],
  };
  async fetchData() {
    let queryParams = queryString.parse(this.props.location.search);
    let { shop = "", product, sort = "" } = queryParams;
    console.log(queryParams);
    let searchStr = this.makeSearchString(queryParams);
    console.log("fecthdata".shop, product, sort, searchStr);
    let response = await http.get(`/svr/purchases?${searchStr}`);
    let { data } = response;
    console.log(data);
    this.setState({
      purchases: data,
    });
  }
  async fetchData1() {
    let response = await http.get("/svr/products");
    let { data } = response;
    console.log(data);
    this.setState({
      products: data,
    });
  }
  async fetchData2() {
    let response = await http.get("/svr/shops");
    let { data } = response;
    console.log(data);
    this.setState({
      shops: data,
    });
  }
  async componentDidMount() {
    this.fetchData();
    this.fetchData1();
    this.fetchData2();
    console.log("Data fetched in componentDidMount");
  }
  async componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.fetchData();
      this.fetchData1();
      this.fetchData2();
      console.log("Data fetched in componentDidUpdate");
    }
  }
  makeSearchString = (opt) => {
    let { shop = "", product = "", sort = "" } = opt;
    let searchStr = "";
    searchStr = this.addToQueryString(searchStr, "shop", shop);
    searchStr = this.addToQueryString(searchStr, "product", encodeURIComponent(product));
    searchStr = this.addToQueryString(searchStr, "sort", sort);
    return searchStr;
  };
  addToQueryString = (str, paramName, paramValue) =>
    paramValue
      ? str
        ? `${str}&${paramName}=${paramValue}`
        : `${paramName}=${paramValue}`
      : str;
  callURL = (url, opt) => {
    let searchString = this.makeSearchString(opt);
    this.props.history.push({
      pathname: url,
      search: searchString,
    });
  };
  handleOptionChange = (opt) => {
    console.log(opt);
    this.callURL("/purchases", opt);
  };
  render() {
    console.log("Render method called");
    const { purchases, products, shops } = this.state;
    console.log(shops);
    const prods = products
      ? products.reduce((acc, curr) => {
          if (!acc.includes(curr.productname)) {
            acc.push(curr.productname);
          }
          return acc;
        }, [])
      : [];
    const stores = shops
      ? shops.reduce((acc, curr) => {
          if (!acc.includes(curr.name)) {
            acc.push(curr.name);
          }
          return acc;
        }, [])
      : [];
    let queryParams = queryString.parse(this.props.location.search);
    let { shop = "", product = "", sort = "" } = queryParams;
    console.log("hi", prods, product, stores.length, shop, sort);
    return (
      <div className="container">
        <div className="row">
          <div className="col-3">
            <LeftPanel
              stores={stores}
              prods={prods}
              sortOpt={this.state.sortOpt}
              options={queryParams}
              onOptionChange={this.handleOptionChange}
            />
          </div>
          <div className="col-9">
            <div className="row bg-dark text-white border">
              <div className="col-3 border">Purchase Id</div>
              <div className="col-2 border">Shop Id</div>
              <div className="col-2 border">Product Id</div>
              <div className="col-2 border">Quantity</div>
              <div className="col-3 border">Price</div>
            </div>
            {purchases.map((sh) => (
              <div className="row">
                <div className="col-3 border">{sh.purchaseid}</div>
                <div className="col-2 border">{sh.shopid}</div>
                <div className="col-2 border">{sh.productid}</div>
                <div className="col-2 border">{sh.quantity}</div>
                <div className="col-3 border">{sh.price}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
export default PurchaseView;
