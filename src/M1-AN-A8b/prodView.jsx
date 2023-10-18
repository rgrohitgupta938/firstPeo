import React, { Component } from "react";
import http from "./httpService";
import { Link } from "react-router-dom";
class ProdView extends Component {
  state = {
    products: [],
    view: -1,
    product: [],
  };
  async fetchData() {
    let { view } = this.state;
    let { id } = this.props.match.params;
    console.log(id, view);
    let response;
    if (view === -1 || !id) {
      response = await http.get("/svr/products");
      let { data } = response;
      console.log(data);
      this.setState({
        products: data,
        product: [],
      });
    } else if (id && view === 0) {
      response = await http.get(`/svr/purchases/products/${id}`);
      let { data } = response;
      console.log(data);
      this.setState({
        product: data,
      });
    } else if (id && view === 1) {
      response = await http.get(`/svr/totalPurchase/product/${id}`);
      let { data } = response;
      console.log(data);
      this.setState({
        product: data,
      });
    } else {
      response = null;
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
  handleEdit = (st) => {
    this.props.history.push(`/addProd/${st}`);
  };
  handleView = (n) => {
    this.setState({
      view: n,
    });
  };
  render() {
    const { products, view, product } = this.state;
    let { id } = this.props.match.params;
    return (
      <div className="container">
        {view === -1 && !id && (
          <h4 className="text-center">Detail of Products</h4>
        )}
        {(view === -1 || !id) && (
          <div className="row bg-dark text-white border">
            <div className="col-2 border">Product Id</div>
            <div className="col-2 border">Product Name</div>
            <div className="col-2 border">Category</div>
            <div className="col-2 border">Description</div>
          </div>
        )}
        {(view === -1 || !id) &&
          products.map((sh) => (
            <div className="row">
              <div className="col-2 border">{sh.productid}</div>
              <div className="col-2 border">{sh.productname}</div>
              <div className="col-2 border">{sh.category}</div>
              <div className="col-2 border">{sh.description}</div>
              <div className="col-4 border">
                <span className="m-2">
                  <Link to={`/addProd/${sh.productid}`}>Edit</Link>
                </span>
                <span className="m-2" onClick={() => this.handleView(0)}>
                  <Link to={`/products/view/${+sh.productid}`}>Purchase</Link>
                </span>
                <span className="m-2" onClick={() => this.handleView(1)}>
                  <Link to={`/products/view/${+sh.productid}`}>
                    Total Purchase
                  </Link>
                </span>
              </div>
            </div>
          ))}
        {view === 0 && id && (
          <h4 className="text-center">Purchase Details of a Products </h4>
        )}
        {view === 0 && id && (
          <div className="row bg-dark text-white border">
            <div className="col-2 border">Product Id</div>
            <div className="col-2 border">Quantity</div>
            <div className="col-1 border">Price</div>
            <div className="col-2 border">Product Name</div>
            <div className="col-2 border">Category</div>
            <div className="col-2 border">Description</div>
            <div className="col-1 border">Shop Id</div>
          </div>
        )}
        {view === 0 &&
          id &&
          product &&
          product.map((sh) => (
            <div key={sh.productid} className="row">
              <div className="col-2 border">{sh.productid}</div>
              <div className="col-2 border">{sh.quantity}</div>
              <div className="col-1 border">{sh.price}</div>
              <div className="col-2 border">{sh.productname}</div>
              <div className="col-2 border">{sh.category}</div>
              <div className="col-2 border">{sh.description}</div>
              <div className="col-1 border">{sh.shopid}</div>
            </div>
          ))}
        {view === 1 && id && (
          <h4 className="text-center">
            Total Purchase Details of Products in shops
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
          id &&
          product &&
          product.map((sh) => (
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
export default ProdView;
