import React, { Component } from "react";
import auth from "../../../services/authService";
import NavBar from "./navbar";
import { Redirect, Route, Switch } from "react-router-dom";
import Login from "./login";
import Admin from "./admin";
import ViewCustomers from "./viewCustomers";
import AddCustomer from "./addCustomer";
import AllCheque from "./allCheque";
import NetBanking from "./netBanking";
import Logout from "./logout";
import Customer from "./customer";
import ViewCheque from "./viewCheque";
import ViewNet from "./viewNet";
import CustomerDetails from "./customerDetails";
import NomineeDetails from "./nomineeDetails";
import AddPayee from "./addPayee";
import Cheque from "./cheque";
import NetBanking1 from "./netBanking1";
import NotAllowed from "../task1/notAllowed";
class GbiBankMainComp extends Component {
  render() {
    const user = auth.getUser();
    return (
      <React.Fragment>
        <NavBar user={user} />
        <div className="container">
          <Switch>
            <Route
              path="/netBanking"
              render={(props) =>
                user ? (
                  user.role === "customer" ? (
                    <NetBanking1 {...props} />
                  ) : (
                    <Redirect to="/notAllowed" />
                  )
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              path="/cheque"
              render={(props) =>
                user ? (
                  user.role === "customer" ? (
                    <Cheque {...props} />
                  ) : (
                    <Redirect to="/notAllowed" />
                  )
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              path="/addPayee"
              render={(props) =>
                user ? (
                  user.role === "customer" ? (
                    <AddPayee {...props} />
                  ) : (
                    <Redirect to="/notAllowed" />
                  )
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              path="/nomineeDetails"
              render={(props) =>
                user ? (
                  user.role === "customer" ? (
                    <NomineeDetails {...props} />
                  ) : (
                    <Redirect to="/notAllowed" />
                  )
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              path="/customerDetails"
              render={(props) =>
                user ? (
                  user.role === "customer" ? (
                    <CustomerDetails {...props} />
                  ) : (
                    <Redirect to="/notAllowed" />
                  )
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              path="/viewNet"
              render={(props) =>
                user ? (
                  user.role === "customer" ? (
                    <ViewNet {...props} />
                  ) : (
                    <Redirect to="/notAllowed" />
                  )
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              path="/allNet"
              render={(props) =>
                user ? (
                  user.role === "manager" ? (
                    <NetBanking {...props} />
                  ) : (
                    <Redirect to="/notAllowed" />
                  )
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              path="/allCheques"
              render={(props) =>
                user ? (
                  user.role === "manager" ? (
                    <AllCheque {...props} />
                  ) : (
                    <Redirect to="/notAllowed" />
                  )
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              path="/addCustomer"
              render={(props) =>
                user ? (
                  user.role === "manager" ? (
                    <AddCustomer {...props} />
                  ) : (
                    <Redirect to="/notAllowed" />
                  )
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              path="/allCustomers"
              render={(props) =>
                user ? (
                  user.role === "manager" ? (
                    <ViewCustomers {...props} />
                  ) : (
                    <Redirect to="/notAllowed" />
                  )
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              path="/viewCheque"
              render={(props) =>
                user ? (
                  user.role === "customer" ? (
                    <ViewCheque {...props} />
                  ) : (
                    <Redirect to="/notAllowed" />
                  )
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              path="/customer"
              render={(props) =>
                user ? (
                  user.role === "customer" ? (
                    <Customer {...props} />
                  ) : (
                    <Redirect to="/notAllowed" />
                  )
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              path="/admin"
              render={(props) =>
                user ? (
                  user.role === "manager" ? (
                    <Admin {...props} />
                  ) : (
                    <Redirect to="/notAllowed" />
                  )
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              path="/logout"
              render={(props) =>
                user ? (
                  user.role ? (
                    <Logout {...props} />
                  ) : (
                    <Redirect to="/login" />
                  )
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              path="/login"
              render={(props) =>
                !user ? (
                  <Login {...props} />
                ) : user.role === "manager" ? (
                  <Redirect to="/admin" />
                ) : user.role === "customer" ? (
                  <Redirect to="/customer" />
                ) : (
                  ""
                )
              }
            />
            <Route path="/notAllowed" component={NotAllowed} />
            <Redirect from="/" to="/login" />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}
export default GbiBankMainComp;
