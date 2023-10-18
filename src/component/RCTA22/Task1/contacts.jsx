import React, { Component } from "react";
class Contacts extends Component{

    render(){
        const {email,address} = this.props.contact;
        return(
            <div className="container">
                <h1>Wlecome to my Contacts Portal</h1>
                <h6>Email : {email}</h6>
                <h6>Address : {address}</h6>
            </div>
        );
    }
}
export default Contacts;
