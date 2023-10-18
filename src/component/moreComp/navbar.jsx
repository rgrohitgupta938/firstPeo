import React,{Component} from "react";
class NavBar extends Component{
    render(){
        let {products} = this.props;
        return (
            <nav className="navbar navbar-expand-sm navbar-light bg-light">
                <a className="navbar-brand ps-2" href="#">
                   Product Form
                </a>
                <div className="" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Total Produtcs<span className="badge badge-pill badge-warning text-dark">{products.length}</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}
export default NavBar;