import React, { Component } from "react";
import NavBar from "./navbar";
import AddProdComp from "./addProdComp";
import AddStock from "./addStock";
class StoreMainComp extends Component {
  state = {
    products: [
      {
        code: "PEP1253",
        price: 20,
        brand: "Pepsi",
        category: "Food",
        specialOffer: false,
        limitedStock: false,
        quantity: 25,
      },
      {
        code: "MAGG021",
        price: 25,
        brand: "Nestle",
        category: "Food",
        specialOffer: true,
        limitedStock: true,
        quantity: 10,
      },
      {
        code: "LEV501",
        price: 1000,
        brand: "Levis",
        category: "Apparel",
        specialOffer: true,
        limitedStock: true,
        quantity: 3,
      },
      {
        code: "CLG281",
        price: 60,
        brand: "Colgate",
        category: "Personal Care",
        specialOffer: true,
        limitedStock: true,
        quantity: 5,
      },
      {
        code: "MAGG451",
        price: 25,
        brand: "Nestle",
        category: "Food",
        specialOffer: true,
        limitedStock: true,
        quantity: 0,
      },
      {
        code: "PAR250",
        price: 40,
        brand: "Parachute",
        category: "Personal Care",
        specialOffer: true,
        limitedStock: true,
        quantity: 5,
      },
    ],
    brands: [
      "Nestle",
      "Haldiram",
      "Pepsi",
      "Coca Cola",
      "Britannia",
      "Cadburys",
      "P&G",
      "Colgate",
      "Parachute",
      "Gillete",
      "Dove",
      "Levis",
      "Van Heusen",
      "Manyavaar",
      "Zara",
    ],
    view: -1,
    editInx:-1,
  };
  handleAddProduct = () => {
    let s1 = { ...this.state };
    s1.view = 1;
    s1.editInx=-1;
    this.setState(s1);
  };
  handleAddStock = () => {
    let s1 = { ...this.state };
    s1.view = 2;
    this.setState(s1);
  };
  handleProd = (pr) => {
    let s1 = { ...this.state };
    let st = s1.products.findIndex((prd) => prd.code === pr.code);
    let str = st >=0 ? s1.products[st] =pr : s1.products.push(pr);
    s1.view = -1;
    this.setState(s1);
  };
  handleHomePage = () => {
    let s1 = { ...this.state };
    s1.view = -1;
    this.setState(s1);
  };
  handleHomePage1 = () => {
    let s1 = { ...this.state };
    s1.view = -1;
    this.setState(s1);
  };
  handleStock = (pr) => {
    const { code, quantity } = pr;
    const updatedProducts = [...this.state.products];
    const productIndex = updatedProducts.findIndex(
      (product) => product.code === code
    );
    if (productIndex !== -1) {
      updatedProducts[productIndex] = {
        ...updatedProducts[productIndex],
        quantity: updatedProducts[productIndex].quantity + +quantity,
      };
    }

    this.setState({
      products: updatedProducts,
      view: -1,
    });
  };
  handleEdit =(inx) => {
    let s1 = {...this.state};
    s1.editInx = inx;
    s1.view = 1;
    this.setState(s1);
  }

  render() {
    const { products, brands, view,editInx } = this.state;
    let product = {
      code: "",
      price: "",
      brand: "",
      category: "",
      limitedStock: false,
      specialOffer: false,
      quantity: "",
    };
    let prodCode = products.reduce(
      (acc, curr) => (acc.includes(curr.code) ? acc : acc.concat(curr.code)),
      []
    );

    return (
      <div className="container">
        <NavBar products={products} />

        {view === -1 && (
          <>
            <div className="row">
              {products.map((prd, index) => (
                <div className="col-3 text-center bg-light border" key={index}>
                  Code: <strong>{prd.code}</strong>
                  <br />
                  Brand: {prd.brand}
                  <br />
                  Category: {prd.category}
                  <br />
                  Price: {prd.price}
                  <br />
                  Quantity: {prd.quantity}
                  <br />
                  Special Offers: {prd.specialOffer === true ? "Yes" : "No"}
                  <br />
                  Limited Stocks: {prd.limitedStock === true ? "Yes" : "No"}
                  <br />
                  <button
                    className="btn btn-warning m-2"
                    onClick={() => this.handleEdit(index)}
                  >
                    Edit Details
                  </button>
                </div>
              ))}
            </div>

            <button
              className="btn btn-primary m-2"
              onClick={this.handleAddProduct}
            >
              Add New Product
            </button>
            <button
              className="btn btn-primary m-2"
              onClick={this.handleAddStock}
            >
              Receive New Stock
            </button>
          </>
        )}

        {view === 1 && (
          <AddProdComp
            product={editInx >=0 ? product = products[editInx] : product}
            onSubmit={this.handleProd}
            onHomePage={this.handleHomePage}
            edit = { editInx >=0 ? 1 : 0}
          />
        )}
        {view === 2 && (
          <AddStock
            product={product}
            prodCode={prodCode}
            onSubmit1={this.handleStock}
            onHomePage1={this.handleHomePage1}
          />
        )}
      </div>
    );
  }
}
export default StoreMainComp;
