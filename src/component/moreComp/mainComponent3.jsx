import React, { Component } from "react";
import NavBar from "./navbar";
import ProductForm from "./productForm";
class MainComponent3 extends Component {
  state = {
    products: [
      {
        name: "Maggi",
        desc: "Instant noodles",
        code: "AB3456",
        category: "Food",
        price: "199",
        disc: "10%",
      },
      {
        name: "iPhone 12",
        desc: "Smartphone",
        code: "AB9012",
        category: "Electronics",
        price: "99999",
        disc: "5%",
      },
      {
        name: "Nike Air Max",
        desc: "Running shoes",
        code: "CD5678",
        category: "Apparels",
        price: "12999",
        disc: "5%",
      },
      {
        name: "Sony PlayStation 5",
        desc: "Gaming console",
        code: "EF4567",
        category: "Grocery",
        price: "49999",
        disc: "15%",
      },
      {
        name: "Air Vision",
        desc: "Apple air Vision pro",
        code: "RG6789",
        category: "Electronics",
        price: "1299",
        disc: "20%",
      },
    ],
    view: -1,
    editProductIndex: -1,
  };
  handleProduct = (product) => {
    let s1 = { ...this.state };
    s1.editProductIndex >= 0
      ? (s1.products[s1.editProductIndex] = product)
      : s1.products.push(product);
    s1.view = -1;
    s1.editProductIndex = -1;
    this.setState(s1);
  };
  onEdit = (inx) => {
    let s1 = { ...this.state };
    s1.view = 0;
    s1.editProductIndex = inx;
    this.setState(s1);
  };
  onDelete = (inx) => {
    let s1 = { ...this.state };
    s1.view = -1;
    s1.products.splice(inx, 1);
    this.setState(s1);
  };
  addNewProduct = () => {
    let s1 = { ...this.state };
    s1.view = 0;
    this.setState(s1);
  }
  render() {
    const { products,view,editProductIndex } = this.state;
    let product = {
      name: "",
      desc: "",
      code: "",
      category: "",
      price: "",
      disc: "",
    };
    return (
      <div className="container">
        <NavBar products={products} />
        <div className="row text-white bg-dark border text-center">
          <div className="col-2 border">Name</div>
          <div className="col-2 border">Product Code</div>
          <div className="col-1 border">Price</div>
          <div className="col-2 border">Description</div>
          <div className="col-1 border">Discount</div>
          <div className="col-2 border">Category</div>
          <div className="col-2 border"></div>
        </div>
        {products.map((prod, index) => {
          let { name, desc, price, disc, category, code } = prod;
          return (
            <div className="row text-center">
              <div className="col-2 border">{name}</div>
              <div className="col-2 border">{code}</div>
              <div className="col-1 border">{price}</div>
              <div className="col-2 border">{desc}</div>
              <div className="col-1 border">{disc}</div>
              <div className="col-2 border">{category}</div>
              <div className="col-2 border">
                <button
                  className="btn btn-info btn-sm m-1"
                  onClick={() => this.onEdit(index)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-warning btn-sm m-1"
                  onClick={() => this.onDelete(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
        <button
          className="btn btn-primary btn-lg m-2"
          onClick={() => this.addNewProduct()}
        >
          Add new Product
        </button>
        {view === 0 ? (
          <ProductForm
            product={
              editProductIndex >= 0 ? products[editProductIndex] : product
            }
            onSubmit={this.handleProduct}
          />
        ) : null}
      </div>
    );
  }
}
export default MainComponent3;
