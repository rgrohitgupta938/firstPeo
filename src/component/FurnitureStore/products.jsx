import React, { Component } from "react";
import http from "../../services/httpService";
import ProductDisplay from "./productDisplay";
import LeftPanel from "./leftPanel";
import "./main.css";

class Products extends Component {
  state = {
    data: [],
    data1: [],
    view: 0,
    categoryArr: [],
    selImg: null,
    selCategory: "",
    cartItems: [],
  };
  handleOptionChange = (pr) => {
    this.setState({ selCategory: pr });
    this.props.history.push(`/products/${pr}`);
  };
  async fetchProduct() {
    try {
      let { category, code } = this.props.match.params;
      console.log(category, code);
      let response = [];
      let response1 = [];
      if (code || category) {
        if (category) {
          response1 = await http.get(`/products/${category}`);
          let { data } = response1;
          this.setState({ data1: data });
        }
        if (code && category) {
          response = await http.get(`/products/${category}/${code}`);
          let { data } = response;
          console.log("In code & categor", data);
          this.setState({ data: data });
        }
      } else {
        response1 = await http.get("/products");
        console.log("With out code and category", response);
        let { data } = response1;
        this.setState({ data1: data });
      }
    } catch (error) {
      console.log(error);
    }
  }
  async fecthCategory() {
    try {
      let response = await http.get("/category");
      this.setState({ categoryArr: response.data });
    } catch (error) {}
  }
  componentDidMount() {
    this.fetchProduct();
    this.fecthCategory();
  }
  handleProduct = (category, id) => {
    this.props.history.push(`/products/${category}/${id}`);
    console.log(category);
    this.setState({ view: 1, selImg: id, selCategory: category });
    setTimeout(() => {
      this.setState({ selImg: null });
    }, 3000);
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.match.params.category !== this.props.match.params.category ||
      prevProps.match.params.code !== this.props.match.params.code
    ) {
      this.fetchProduct();
      this.fecthCategory();
    }
  }
  handleCartItems = (prodCode) => {
    let s1 = { ...this.state };
    console.log(prodCode);
    s1.cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    let st = s1.cartItems.findIndex((i) => i.prodCode === prodCode);
    if (st >= 0) {
      let item = s1.cartItems[st];
      item.qty = item.qty + 1;
      s1.cartItems[st] = item;
    } else {
      let newItem = { prodCode: prodCode, qty: 1 };
      s1.cartItems.push(newItem);
    }
    console.log(s1.cartItems);
    localStorage.setItem("cart", JSON.stringify(s1.cartItems));
    this.setState(s1);
  };

  render() {
    const { data, view, disId, data1, categoryArr, selCategory, cartItems } =
      this.state;
    let { category, code } = this.props.match.params;
    console.log(data, categoryArr, cartItems);
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-auto left-panel">
            <LeftPanel
              onOptionChange={this.handleOptionChange}
              categoryArr={categoryArr}
              selCategory={this.state.selCategory}
              history={this.props.history}
            />
          </div>

          <div className="col-md-5">
            <div className="row">
              {data1 &&
                data1.map((p, index) => (
                  <div
                    className={`col-md-6 mb-1 mt-1 ms-0 me-0 d-flex align-items-center justify-content-center ${
                      this.state.selImg === p.prodCode ? "img-cursor" : ""
                    }`}
                    key={index}
                    style={{
                      zIndex:
                        this.state.selectedImage === p.prodCode ? 1 : "auto",
                    }}
                  >
                    <img
                      src={p.img}
                      alt="..."
                      style={{ height: "90%", width: "90%" }}
                      onClick={() => this.handleProduct(p.category, p.prodCode)}
                    />
                  </div>
                ))}
            </div>
          </div>
          <div className="col-md-4">
            {category && code && (
              <ProductDisplay
                data={data}
                handleCart={this.handleCartItems}
                history={this.props.history}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Products;
