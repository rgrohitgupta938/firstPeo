import React,{Component} from "react";
import NavBar from "./navbar";
import { Route, Switch } from "react-router-dom";
import Customers from "./customers";
import NewCust from "./newCust";
class CustMainComp extends Component{

    render(){
        return(
            <React.Fragment>
                <NavBar />
            <Switch>
                <Route path="/customers" component={Customers} />
                <Route path="/newCust/:id" component={NewCust} />
                <Route path="/newCust" component={NewCust} />
            </Switch>
            </React.Fragment>
        );
    }

}
export default CustMainComp;