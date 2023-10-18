import React,{Component} from "react";
class NavBar extends Component{
    render(){
        let {allMatches} = this.props;
        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                <a className="navbar-brand ps-2" href="#">
                   Football Tournament
                </a>
                <div className="" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Number of Matches<span className="badge badge-pill badge-warning text-light">{allMatches.length}</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}
export default NavBar;