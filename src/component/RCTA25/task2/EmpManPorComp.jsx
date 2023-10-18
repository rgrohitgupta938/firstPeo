import React, { Component } from "react";
import NavBar from "./navbar";
import { Redirect, Route, Switch } from "react-router-dom";
import Login from "./login";
import Admin from "./admin";
import MyPortal from "./emp";
import Logout from "./logout";
import auth from "../../../services/authService";
import ViewEmp from "./viewEmp";
import AddEmp from "./addEmp";
import ViewEmpDetails from "./viewEmpDetails";
import ContactDeatils from "./contactDetails";
import Bills from "./bills";
import HotelBill from "./hotelBill";
import TravelBill from "./travelBill";
import NotAllowed from "./notAllowed";
class EmpManPorComp extends Component {
  render() {
    const user = auth.getUser();
    return (
      <React.Fragment>
        <NavBar user={user} />
        <div className="container">
          <Switch>
            <Route
              path="/emp/travelbill/:id"
              render={(props) =>
                user ? (
                  user.role === "EMPLOYEE" ? (
                    <TravelBill {...props} />
                  ) : (
                    <Redirect to="/notAllowed" />
                  )
                ) : (
                  <Redirect to="/login" />
                )
              }
            />{" "}
            <Route
              path="/emp/hotelbill/:id"
              render={(props) =>
                user ? (
                  user.role === "EMPLOYEE" ? (
                    <HotelBill {...props} />
                  ) : (
                    <Redirect to="/notAllowed" />
                  )
                ) : (
                  <Redirect to="/login" />
                )
              }
            />{" "}
            <Route
              path="/bills"
              render={(props) =>
                user ? (
                  user.role === "EMPLOYEE" ? (
                    <Bills {...props} />
                  ) : (
                    <Redirect to="/notAllowed" />
                  )
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              path="/login"
              render={(props) =>
                user ? (
                  user.role === "ADMIN" ? (
                    <Redirect to="/admin" />
                  ) : user.role === "EMPLOYEE" ? (
                    <Redirect to="/emp" />
                  ) : (
                    <Redirect to="/notAllowed" />
                  )
                ) : (
                  <Login {...props} />
                )
              }
            />
            <Route
              path="/admin/addEmp"
              render={(props) =>
                user ? (
                  user.role === "ADMIN" ? (
                    <AddEmp {...props} />
                  ) : (
                    <Redirect to="/notAllowed" />
                  )
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              path="/admin/viewemp/:id"
              render={(props) =>
                user ? (
                  user.role === "ADMIN" ? (
                    <ViewEmpDetails {...props} />
                  ) : (
                    <Redirect to="/notAllowed" />
                  )
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              path="/admin/viewemp"
              render={(props) =>
                user ? (
                  user.role === "ADMIN" ? (
                    <ViewEmp {...props} />
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
                  user.role === "ADMIN" ? (
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
              path="/emp/contact"
              render={(props) =>
                user ? (
                  user.role === "EMPLOYEE" ? (
                    <ContactDeatils {...props} />
                  ) : (
                    <Redirect to="/notAllowed" />
                  )
                ) : (
                  <Redirect to="/login" />
                )
              }
            />{" "}
            <Route
              path="/emp"
              render={(props) =>
                user ? (
                  user.role === "EMPLOYEE" ? (
                    <MyPortal {...props} />
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
                user ? <Logout {...props} /> : <Redirect to="/login" />
              }
            />
            <Route path="/notAllowed" component={NotAllowed} />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}
export default EmpManPorComp;
