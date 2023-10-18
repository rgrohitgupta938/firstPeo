import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./home";
import Contacts from "./contacts";
import Products from "./products";
import Product from "./product";
import NavBar from "./navbar";
import AddProduct from "./addProduct";
import Stores from "./stores";
import AddNewStore from "./addNewStore";

class RMainComponent extends Component {
  state = {
    products: [
      {
        id: "A101",
        brand: "Pespi",
        category: "Beverages",
        product: "Pepsi 300ml",
        price: 30,
        instock: true,
      },
      {
        id: "A232",
        brand: "Coca Cola",
        category: "Beverages",
        product: "Diet Coke 300ml",
        price: 25,
        instock: false,
      },
      {
        id: "A102",
        brand: "Pespi",
        category: "Beverages",
        product: "Pepsi 500ml",
        price: 40,
        instock: true,
      },
      {
        id: "A237",
        brand: "Coca Cola",
        category: "Beverages",
        product: " Coke 1l",
        price: 75,
        instock: true,
      },
      {
        id: "B034",
        brand: "Dairy Milk",
        category: "Chocolates",
        product: "Fruits and Nuts 40g",
        price: 15,
        instock: false,
      },
      {
        id: "B035",
        brand: "Dairy Milk",
        category: "Chocolates",
        product: "Crackles 100g",
        price: 45,
        instock: true,
      },
      {
        id: "B036",
        brand: "Dairy Milk",
        category: "Chocolates",
        product: "Nutties 20g",
        price: 10,
        instock: true,
      },
      {
        id: "B173",
        brand: "Snickers",
        category: "Chocolates",
        product: "25g bar",
        price: 35,
        instock: false,
      },
    ],
    stores: [
      {
        id: 101,
        location: "Delhi",
        email: "store101@email.com",
        mobile: "2734672371",
      },
      {
        id: 102,
        location: "Mumbai",
        email: "store102@email.com",
        mobile: "4645757441",
      },
      {
        id: 103,
        location: "Delhi",
        email: "store103@email.com",
        mobile: "983452887",
      },
      {
        id: 104,
        location: "Bengaluru",
        email: "store104@email.com",
        mobile: "782234663",
      },
      {
        id: 108,
        location: "Delhi",
        email: "store108@email.com",
        mobile: "850003461",
      },
      {
        id: 114,
        location: "Bengaluru",
        email: "store114@email.com",
        mobile: "900346731",
      },
      {
        id: 125,
        location: "Delhi",
        email: "store125@email.com",
        mobile: "95134274005",
      },
      {
        id: 129,
        location: "Mumbai",
        email: "store129@email.com",
        mobile: "9823574623",
      },
      {
        id: 141,
        location: "Mumbai",
        email: "store141@email.com",
        mobile: "89239472385",
      },
      {
        id: 156,
        location: "Bengaluru",
        email: "store157@email.com",
        mobile: "965746731",
      },
      {
        id: 21,
        location: "Delhi",
        email: "store021@email.com",
        mobile: "959530041",
      },
      {
        id: 277,
        location: "Mumbai",
        email: "store277@email.com",
        mobile: "8900673411",
      },
      {
        id: 89,
        location: "Bengaluru",
        email: "store89@email.com",
        mobile: "782234663",
      },
      {
        id: 120,
        location: "Delhi",
        email: "store120@email.com",
        mobile: "850003461",
      },
      {
        id: 255,
        location: "Bengaluru",
        email: "store255@email.com",
        mobile: "900346731",
      },
      {
        id: 17,
        location: "Delhi",
        email: "store17@email.com",
        mobile: "95134274005",
      },
      {
        id: 27,
        location: "Mumbai",
        email: "store27@email.com",
        mobile: "9823574623",
      },
    ],
    contact: {
      email: "mail@myportal.com",
      address: "402,4th Floor ,Tower D1",
    },
  };
  handleAddProduct = (pr) => {
    let s1 = {...this.state}
    s1.products.push(pr);
    this.setState(s1);
  }
  handleAddNewProduct = (st) => {
    let s1 = {...this.state}
    s1.stores.push(st);
    this.setState(s1);
  }

  render() {
    const { contact, products,stores } = this.state;
    return (
      <div className="container">
        <NavBar />
        <Switch>
          <Route
            path="/product/:id"
            render={(props) => <Product {...props} products={products} />}
          />
          <Route
            path="/brand/:value"
            render={(props) => <Products {...props} products={products} display="brand" />}
          />
          <Route
            path="/category/:value"
            render={(props) => <Products {...props} products={products} display="category" />}
          />
          <Route path="/home" component={Home} />
          <Route
            path="/contacts"
            render={(props) => <Contacts {...props} contact={contact} />}
          />
          <Route
            path="/products"
            render={(props) => <Products {...props} products={products} />}
          />
          <Route
            path="/addProduct"
            render={(props) => <AddProduct {...props} productInfo={{}} onSubmit = {this.handleAddProduct} />}
          />
          <Route
            path="/stores"
            render={(props) => <Stores {...props} stores={stores}/>}
          />
          <Route
            path="/addNewStore"
            render={(props) => <AddNewStore {...props} storeInfo={{}} onSubmit = {this.handleAddNewProduct} />}
          />
         
          <Redirect from="/" to="/home" />
        </Switch>
      </div>
    );
  }
}

export default RMainComponent;
