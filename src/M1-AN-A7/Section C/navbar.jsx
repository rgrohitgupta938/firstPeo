import React,{Component} from "react";
class NavBar extends Component{
    render(){
        const {onNewBill} = this.props;
        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                <a className="navbar-brand ps-2" href="#">
                   BillingSystem
                </a>
                <div className="" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={()=> onNewBill}>
                                New Bill
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}
export default NavBar;