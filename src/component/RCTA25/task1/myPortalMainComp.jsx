import React, { Component } from "react";
import NavBar from "./navbar";
import { Redirect, Route, Switch } from "react-router-dom";
import Products from "./products";
import AddProduct from "./addProduct";
import Product from "./product";
import DeleteProduct from "./deleteProduct";
import Login from "./login";
import Logout from "./logout";
import auth from "../../../services/authService";
import Users from "./users";
import NotAllowed from "./notAllowed";
import AddUser from "./addUser";
import Deleteuser from "./deleteUser";
class MyPortalMainComp extends Component {
  render() {
    const user = auth.getUser();
    return (
      <div className="container">
        <NavBar user={user} />
        <Switch>
          <Route
            path="/products/:id/edit"
            render={(props) =>
              user ? (
                user.role === "admin" ? (
                  <AddProduct {...props} />
                ) : (
                  <Redirect to="/notAllowed" />
                )
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            path="/products/:id/delete"
            render={(props) =>
              user ? (
                user.role === "admin" ? (
                  <DeleteProduct {...props} />
                ) : (
                  <Redirect to="/notAllowed" />
                )
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            path="/products/add"
            render={(props) =>
              user ? <AddProduct {...props} /> : <Redirect to="/notAllowed" />
            }
          />
          <Route path="/products/:id" component={Product} />
          <Route path="/products" component={Products} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route
            path="/addUser/:username/delete"
            render={(props) =>
              user ? (
                user.role === "admin" ? (
                  <Deleteuser {...props} />
                ) : (
                  <Redirect to="/notAllowed" />
                )
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            path="/addUser/:username/edit"
            render={(props) =>
              user ? (
                user.role === "admin" ? (
                  <AddUser {...props} />
                ) : (
                  <Redirect to="/notAllowed" />
                )
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            path="/addUser"
            render={(props) =>
              user ? (
                user.role === "admin" ? (
                  <AddUser {...props} />
                ) : (
                  <Redirect to="/notAllowed" />
                )
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            path="/users"
            render={(props) =>
              user ? (
                user.role === "admin" ? (
                  <Users {...props} />
                ) : (
                  <Redirect to="/notAllowed" />
                )
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route path="/notAllowed" component={NotAllowed} />
          <Redirect from="/" to="/products" />
        </Switch>
      </div>
    );
  }
}
export default MyPortalMainComp;
