import React, { Component } from "react";
import { Route,Switch } from "react-router-dom";
import CompA from "./compA";
import CompB from "./compB";
import NavBar from "./navbar";
class MainComp extends Component{
    render(){
        return (
            <div className="container">
                <NavBar />
                <Switch>
                    <Route path="/compA" component={CompA} />
                    <Route path="/compB/:name" component={CompB} />
                </Switch>
            </div>
        );
    }
}
export default MainComp;
