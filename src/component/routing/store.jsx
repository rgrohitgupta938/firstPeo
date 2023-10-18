import React, { Component } from "react";
class Store extends Component {
  render() {
    const { stores } = this.props;
    const { id } = this.props.match.params;
    let store1  = stores.find((st) => +(st.id) === +(id));
    return (
        <div className="container">
            <h4>Store Details</h4>
            <h6>Store Id: {store1.id}</h6>
            <h6>Store Location: {store1.location}</h6>
            <h6>Store Email: {store1.email}</h6>
            <h6>Store Mobile: {store1.mobile}</h6>
        </div>
    );
  }
}
export default Store;
