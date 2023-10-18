import React, { Component } from "react";
import http from "./httpService";
import { Link } from "react-router-dom";

class ShopView extends Component {
  state = {
    shops: [],
    view: -1,
    disId: "",
    shop: [],
  };
  makeSearchString = (opt) => {
    let { shop = "", product, sort = "" } = opt;
    let searchStr = "";
    searchStr = this.addToQueryString(searchStr, "shop", shop);
    searchStr = this.addToQueryString(searchStr, "product", product);
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
  async fetchData() {
    let { view, shop } = this.state;
    let { id } = this.props.match.params;
    console.log(id, view);
    let response;

    if (view === -1 || !id) {
      response = await http.get("/svr/shops");
    } else if (id && view === 0) {
      response = await http.get(`/svr/purchases/shops/${id}`);
    } else if (id && view === 1) {
      response = await http.get(`/svr/totalPurchase/shop/${id}`);
    } else {
      response = null;
    }

    let { data } = response;
    console.log(data);

    if (view === -1) {
      this.setState({
        shops: data,
        shop: [],
      });
    } else {
      this.setState({
        shop: data,
      });
    }
  }

  async componentDidMount() {
    this.fetchData();
  }

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.match.params.id !== this.props.match.params.id ||
      prevState.view !== this.state.view
    ) {
      this.fetchData();
    }
  }
  handleView = (n) => {
    this.setState({
      view: n,
    });
  };
  render() {
    const { shops, view, shop } = this.state;
    let { id } = this.props.match.params;
    return (
      <div className="container">
        {view === 0 && !id && <h4 className="text-center">Details of Shops</h4>}
        {(view === -1 || !id) && (
          <div className="row bg-dark text-white border">
            <div className="col-3 border">Shop Id</div>
            <div className="col-3 border">Shop Name</div>
            <div className="col-3 border">Rent</div>
          </div>
        )}
        {(view === -1 || !id) &&
          shops.map((sh) => (
            <div key={sh.shopid} className="row">
              <div className="col-3 border">{sh.shopid || sh.shopId}</div>
              <div className="col-3 border">{sh.name}</div>
              <div className="col-3 border">{sh.rent}</div>
              <div className="col-3 border">
                <span className="m-2" onClick={() => this.handleView(0)}>
                  <Link to={`/shops/view/${sh.shopid || sh.shopId}`}>
                    Purchases
                  </Link>
                </span>
                <span className="m-2" onClick={() => this.handleView(1)}>
                  <Link to={`/shops/view/${sh.shopid || sh.shopId}`}>Total Purchase</Link>
                </span>
              </div>
            </div>
          ))}
        {view === 0 && id && (
          <h4 className="text-center">Purchase Details of a Shop </h4>
        )}
        {view === 0 && id && (
          <div className="row bg-dark text-white border">
            <div className="col-2 border">Product Id</div>
            <div className="col-2 border">Shop Id</div>
            <div className="col-2 border">Shop Name</div>
            <div className="col-2 border">Product Quantity</div>
            <div className="col-2 border">Product Price</div>
            <div className="col-2 border">Shop rent</div>
          </div>
        )}
        {view === 0 &&
          id && shop &&
          shop.map((sh) => (
            <div key={sh.productid} className="row">
              <div className="col-2 border">{sh.productid}</div>
              <div className="col-2 border">{sh.shopid}</div>
              <div className="col-2 border">{sh.name}</div>
              <div className="col-2 border">{sh.quantity}</div>
              <div className="col-2 border">{sh.price}</div>
              <div className="col-2 border">{sh.rent}</div>
            </div>
          ))}
        {view === 1 && id && (
          <h4 className="text-center">
            Total Purchase Details of Products in a shop
          </h4>
        )}
        {view === 1 && id && (
          <div className="row bg-dark text-white border">
            <div className="col-2 border">Product Id</div>
            <div className="col-2 border">Shop Id</div>
            <div className="col-2 border">Total Quantity</div>
            <div className="col-2 border">Total Price</div>
            <div className="col-2 border">Shop Name</div>
            <div className="col-2 border">Shop rent</div>
          </div>
        )}
        {view === 1 &&
          id && shop &&
          shop.map((sh) => (
            <div key={sh.productid} className="row">
              <div className="col-2 border">{sh.productid}</div>
              <div className="col-2 border">{sh.shopid}</div>
              <div className="col-2 border">{sh.totalquantity}</div>
              <div className="col-2 border">{sh.totalprice}</div>
              <div className="col-2 border">{sh.name}</div>
              <div className="col-2 border">{sh.rent}</div>
            </div>
          ))}
      </div>
    );
  }
}

export default ShopView;
