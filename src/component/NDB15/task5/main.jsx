import React, { Component } from "react";
import http from "../../../services/httpService";
import LeftPanel from "./leftPanel";
class Main extends Component {
  state = {
    data: [],
    optionsArr: [
      "All",
      "Sunglasses",
      "Watches",
      "Belts",
      "Handbags",
      "Wallets",
      "Formal Shoes",
      "Sport Shoes",
      "Floaters",
      "Sandals",
    ],
  };
  async fetchProd() {
    let { category } = this.props.match.params;
    let response = category
      ? await http.get(`/products/${category}`)
      : await http.get(`/products`);
    let { data } = response;
    this.setState({ data: data });
  }
  componentDidMount() {
    this.fetchProd();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.match.params.category !== this.props.match.params.category) {
      this.fetchProd();
    }
  }
  findCartItemIndex = (id) => {
    const { cartItems } = this.props;
    return cartItems.findIndex((item) => item.id === id);
  };
  handleAddToCart = (id) => {
    const { onAddOrRemove } = this.props;
    const index = this.findCartItemIndex(id);
    if (index === -1) {
      onAddOrRemove(id, 1); // Add the item
    } else {
      onAddOrRemove(id, 0); // Remove the item
    }
  };
  render() {
    const { data } = this.state;
    const { optionsArr } = this.state;
    const { cartItems } = this.props;

    return (
      <div className="container">
        <div className="row">
          <div className="col-3">
            <LeftPanel optionsArr={optionsArr} history={this.props.history} />
          </div>
          <div className="col-9">
            <div className="row">
              {data.length !== 0 &&
                data.map((pr) => (
                  <div className="col-4" key={pr.id}>
                    <div className="card h-100">
                      <img
                        src={pr.imglink}
                        className="img-fluid card-img-top"
                        alt="Image not Available"
                        style={{ height: "200px" }}
                      />
                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title">{pr.name}</h5>
                        <p className="card-text text-whitesmoke">
                          <p>Rs. {pr.price}</p>
                          {pr.description}
                        </p>
                        <div className=" row mt-auto">
                          <button
                            className={
                              this.findCartItemIndex(pr.id) === -1
                                ? "btn btn-success"
                                : "btn btn-warning"
                            }
                            onClick={() => this.handleAddToCart(pr.id)}
                          >
                            {this.findCartItemIndex(pr.id) === -1
                              ? "Add to Cart"
                              : "Remove from Cart"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              {data.length === 0 && (
                <h3 className="text-center text-danger">
                  No Product Available
                </h3>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Main;
