import React,{Component} from "react";
class NavBar extends Component{
    render(){
        let {products} = this.props;
        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                <a className="navbar-brand ps-2" href="#">
                   ProdStoreSys
                </a>
                <div className="" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Produtcs<span className="badge badge-pill badge-warning text-white bg-secondary">{products.length}</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Quantity<span className="badge badge-pill badge-warning text-white bg-secondary">{products.reduce((acc,curr) => acc = acc+(+curr.quantity),0)}</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Value<span className="badge badge-pill badge-warning text-white bg-secondary">{products.reduce((acc,curr) => acc = acc+(+curr.quantity)*(+curr.price),0)}</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}
export default NavBar;