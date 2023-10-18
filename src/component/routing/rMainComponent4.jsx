import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar2 from "./navbar2";
import Store from "./store";
import Stores from "./stores";

class RMainComponent4 extends Component {
  state = {
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
  };
  render() {
    const { stores } = this.state;
    
    return (
      <div className="container">
        <NavBar2 stores={stores} />
        <Switch>
          <Route
            path="/stores/:page"
            render={(props) => <Stores {...props} stores={stores} />}
          />
           <Route
            path="/store/:id"
            render={(props) => <Store {...props} stores={stores} />}
          />
           <Route
            path="/location/:loc/:page"
            render={(props) => <Stores {...props} stores={stores} display = "location"/>}
          />
          
        </Switch>
       
      </div>
    );
  }
}
export default RMainComponent4;
