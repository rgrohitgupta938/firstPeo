import React, { Component } from "react";
import http from "../../../services/httpService";
import auth from "../../../services/authService";
import { Redirect } from "react-router-dom";
import Login from "./login";
import OrderSummary from "./orderSummary";
class Cart extends Component {
  state = {
    data: [],
    cartItems: this.props.cartItems,
    orders: [],
    view: 0,
    userOrder: {},
  };
  async fetchProd() {
    let response = await http.get("/products");
    let { data } = response;
    this.setState({ data: data }, () => {
      this.updateOrder();
      this.getCartValue();
    });
  }
  componentDidMount() {
    this.fetchProd();
    this.updateOrder();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.cartItems !== this.props.cartItems) {
      this.fetchProd();
      this.updateOrder();
      this.setState({ cartItems: this.props.cartItems });
    }
    if (prevState.data !== this.state.data) {
      this.updateOrder();
    }
  }
  updateOrder = () => {
    const { cartItems, data, orders } = this.state;
    const updatedItems = cartItems.map((cartItem) => {
      const matchingProduct = data.find(
        (product) => +product.id === +cartItem.id
      );
      console.log(matchingProduct, data.length);
      if (matchingProduct) {
        return {
          ...matchingProduct,
          qty: cartItem.qty,
          cartValue: cartItem.qty * matchingProduct.price,
        };
      }
      return cartItem;
    });
    this.setState({ orders: updatedItems });
  };
  getCartValue = () => {
    const { cartItems, data } = this.state;
    let cartValue = cartItems.reduce((totalValue, cartItem) => {
      const item = data.find((product) => product.id === cartItem.id);
      if (item) {
        totalValue += item.price * cartItem.qty;
      }
      return totalValue;
    }, 0);

    return cartValue;
  };
  getNumItem = () => {
    const { cartItems, orders } = this.state;
    let num = cartItems.reduce((acc, curr) => (acc = curr.qty + acc), 0);
    return num;
  };
  handleCheckOut = () => {
    let { orders } = this.state;
    let user = auth.getUser();
    if (user) {
      let userOrder = {
        userId: user.userId,
        email: user.email,
        items: orders.length,
        name: "",
        address1: "",
        address2: "",
        city: "",
        totalamount: orders.reduce(
          (acc, curr) => (acc = acc + curr.cartValue),
          0
        ),
      };
      this.setState({ view: 2, userOrder: userOrder, orders: orders });
    } else {
      localStorage.setItem("orders", JSON.stringify(orders));
      this.setState({ view: 1, orders: orders });
    }
  };
  postOrder = async (obj) => {
    console.log(obj);
    let response = await http.post("/orders", obj);
    console.log(response);
  };
  render() {
    const { cartItems, orders, view, userOrder } = this.state;
    const { onAddOrRemove } = this.props;
    return (
      <div className="container">
        {view === 0 && (
          <React.Fragment>
            <h3 className="text-center mt-2 mb-2">
              You Have {this.getNumItem()} Items in Your Cart
            </h3>
            <div className="row">
              <div className="col-2">
                {" "}
                <p>
                  <strong>Cart Value: Rs. {this.getCartValue()}</strong>
                </p>
              </div>
              <div className="col-9"></div>
              <div className="col-1">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => this.handleCheckOut()}
                >
                  Check Out
                </button>
              </div>
            </div>
          </React.Fragment>
        )}
        {view === 0 && orders && (
          <div className="row bg-dark text-white">
            <div className="col-1"></div>
            <div className="col-7">Product Details</div>
            <div className="col-2">Quantity</div>
            <div className="col-2 text-end">Price</div>
          </div>
        )}
        {view === 0 &&
          orders &&
          orders.map((or) => {
            let {
              qty,
              price,
              description,
              name,
              imglink,
              category,
              cartValue,
              id,
            } = or;
            return (
              <div className="row border" key={id}>
                <div className="col-1 p-3">
                  <img
                    src={imglink}
                    width="100px"
                    height="100px"
                    style={{
                      borderRadius: "20%",
                    }}
                  />
                </div>
                <div className="col-7 ps-5" style={{ color: "grey" }}>
                  <p className="pt-2">{name}</p>
                  <p>{category}</p>
                  <p>{description}</p>
                </div>
                <div className="col-2">
                  <button
                    className="btn btn-success m-2"
                    onClick={() => onAddOrRemove(id, 1)}
                  >
                    +
                  </button>
                  {qty}
                  <button
                    className="btn btn-warning m-2"
                    onClick={() => onAddOrRemove(id, 0)}
                  >
                    -
                  </button>
                </div>
                <div className="col-2 text-end" style={{ color: "grey" }}>
                  Rs. {cartValue}
                </div>
              </div>
            );
          })}
        {view === 1 && (
          <Login
            setView={(newView) => this.setState({ view: newView })}
            orders={orders}
            view={view}
          />
        )}
        {view === 2 && (
          <OrderSummary
            history={this.props.history}
            userOrder={userOrder}
            postOrder={this.postOrder}
            orders={orders}
          />
        )}
      </div>
    );
  }
}
export default Cart;
