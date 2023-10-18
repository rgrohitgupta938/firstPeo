import React, { Component } from "react";
import http from "../../services/httpService";
import "./main.css";
class Cart extends Component {
  state = {
    cartIt: [],
    data1: [],
    ingredientQuantities: {},
  };
  handleCartIt = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const { data1 } = this.state;
    const cartIt = data1
      .map((item) => {
        const cartItem = cart.find(
          (cartItem) => cartItem.prodCode === item.prodCode
        );
        if (cartItem) {
          return { ...item, qty: cartItem.qty };
        }
        return null;
      })
      .filter(Boolean);
    this.setState({ cartIt });
    this.updateIngredientQuantities(cartIt);
  };
  async fetchProduct() {
    try {
      const response1 = await http.get("/products");
      const { data } = response1;
      this.setState({ data1: data }, () => {
        this.handleCartIt();
      });
    } catch (error) {
      console.log(error);
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.cartIt.length !== this.state.cartIt.length) {
      console.log("inside of update", prevState.cartIt, this.state.cartIt);
      this.fetchProduct();
    }
  }
  componentDidMount() {
    this.fetchProduct();
  }
  handleInc = (prodCode) => {
    const updatedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemIndex = updatedCart.findIndex(
      (cartItem) => cartItem.prodCode === prodCode
    );
    if (cartItemIndex !== -1) {
      updatedCart[cartItemIndex].qty += 1;
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      this.updateIngredientQuantities(this.state.cartIt);
    }
    this.fetchProduct();
  };

  handleDec = (prodCode) => {
    const updatedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemIndex = updatedCart.findIndex(
      (cartItem) => cartItem.prodCode === prodCode
    );
    if (cartItemIndex !== -1) {
      if (updatedCart[cartItemIndex].qty > 1) {
        updatedCart[cartItemIndex].qty -= 1;
      } else {
        updatedCart.splice(cartItemIndex, 1);
      }
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      this.updateIngredientQuantities(this.state.cartIt);
    }
    this.fetchProduct();
  };

  // Calculate ingredient quantities based on cart items
  updateIngredientQuantities(cartItems) {
    const ingredientQuantities = cartItems.reduce((quantities, item) => {
      if (item.ingredients) {
        item.ingredients.forEach((ingredient) => {
          const { ingName, qty } = ingredient;
          quantities[ingName] = (quantities[ingName] || 0) + qty * item.qty;
        });
      }
      return quantities;
    }, {});

    this.setState({ ingredientQuantities });
  }

  render() {
    const { cartIt, ingredientQuantities } = this.state;
    console.log("Ingredient Quantities:", ingredientQuantities);
    console.log(cartIt);
    return (
      <div className="container">
        <h4 className="text-center">Products in shopping Cart </h4>
        {cartIt.map((c) => (
          <div className="row border" key={c.prodCode}>
            <div className="col-2">
              <img src={c.img} width="80px" height="80px" alt={c.title} />
            </div>
            <div className="col-6">
              <h4>{c.title}</h4>
            </div>
            <div className="col-3">
              <button
                className="btn btn-success btn-sm btn-sq"
                onClick={() => this.handleInc(c.prodCode)}
              >
                +
              </button>
              <button className="btn btn-secondary btn-sm btn-sq">
                {c.qty}
              </button>
              <button
                className="btn btn-danger btn-sm btn-sq"
                onClick={() => this.handleDec(c.prodCode)}
              >
                -
              </button>
            </div>
          </div>
        ))}
        {cartIt.length !== 0 && (
          <React.Fragment>
            <div className="row text-center">
              <div className="col-3"></div>
              <div className="col-3 bg-dark text-white">Item Name</div>
              <div className="col-3 bg-dark text-white">Count</div>
              <div className="col-3"></div>
            </div>
            {Object.entries(ingredientQuantities).map(
              ([ingredient, quantity]) => (
                <div className="row text-center" key={ingredient}>
                  <div className="col-3"></div>
                  <div className="col-3">{ingredient}</div>
                  <div className="col-3">{quantity}</div>
                  <div className="col-3"></div>
                </div>
              )
            )}
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default Cart;
