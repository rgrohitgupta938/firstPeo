import React,{Component} from "react";
class NavBar extends Component{
    render(){
        const {onMenuChn} = this.props;
        return (
            <nav className="navbar navbar-expand-sm navbar-light bg-light">
                <a className="navbar-brand ps-2 fw-bold" href="#">
                   MyFavPizza
                </a>
                <div className="" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={() => onMenuChn("Veg Pizza")}>
                                Veg Pizza
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={() => onMenuChn("Non-Veg Pizza")}>
                                Non-Veg Pizza
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={() => onMenuChn("Side Dishes")}>
                                Side Dishes
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={() => onMenuChn("Other Items")}>
                                Other Items
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}
export default NavBar;