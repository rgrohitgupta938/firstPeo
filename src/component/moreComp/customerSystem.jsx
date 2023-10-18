import React, { Component } from "react";
import Customer from "./customer";

class CustomerSystem extends Component {
  state = {
    customers: [{ custName: "Amit",gender:"Male",delivery:"Office",payOpt:["Credit Card","Net Banking"],deliverytime:"2PM-6PM"},],
    view: -1,
    editIndex: -1,
  };
  showList = () => {
    this.setState({ view: 0 });
  };
  handleSubmit = (arr) => {
    let s1 = { ...this.state };
    s1.editIndex >= 0
      ? (s1.customers[s1.editIndex] = arr)
      : s1.customers.push(arr);
    s1.editIndex = -1;
    s1.view = 0;
    this.setState(s1);
  };
  addnew = () => {
    this.setState({ view: 1 });
  };
  edit = (inx) => {
    let s1 = { ...this.state };
    s1.view = 1;
    s1.editIndex = inx;
    this.setState(s1);
  };

  render() {
    const { customers, view,editIndex } = this.state;
    let customer = { custName: "",gender:"",delivery:"",payOpt:[],deliverytime:""};

    return (
      <div className="container">
        <button className="btn btn-primary m-2" onClick={this.addnew}>
          New Customer
        </button>
        <button className="btn btn-primary m-2" onClick={this.showList}>
          List of Customers
        </button>
        
        {view === 0 ? (
          customers.length === 0 ? (
            <p>There are Zero Customers</p>
          ) : (
            <div className="conatiner justify-content-center">
              <div className="row border bg-dark text-white justify-content-center">
                <div className="col-2 border">Name</div>
                <div className="col-2 border">Gender</div>
                <div className="col-2 border">Delivery Id</div>
                <div className="col-2 border">Payments</div>
                <div className="col-2 border">Slot</div>
                <div className="col-2 border"></div>
              </div>
              {customers.map((k,index) => {
                let { custName, delivery, gender,deliverytime,payOpt } = k;
                return (
                  <div className="row border">
                    <div className="col-2 border">{custName}</div>
                    <div className="col-2 border">{gender}</div>
                    <div className="col-2 border">{delivery}</div>
                    <div className="col-2 border">{payOpt.map((n) => (
                        <React.Fragment>
                          <p>{n}</p>
                        </React.Fragment>
                      ))}</div>
                    <div className="col-2 border">{deliverytime}</div>
                    <div className="col-2 border"><button className="btn btn-info btn-sm m-1" onClick={() => this.edit(index)}>Edit</button></div>
                    </div>
                );
              })}
            </div>
          )
        ) : view === 1 ? (
          <Customer customer={editIndex >= 0 ? customers[editIndex] : customer} onSubmit={this.handleSubmit} />
        ) : (
          <p>Welcome to the Customer System</p>
        )}
      </div>
    );
  }
}

export default CustomerSystem;
