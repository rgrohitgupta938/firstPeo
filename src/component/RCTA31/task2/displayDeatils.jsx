import React, { Component } from "react";
class DisplayDetails extends Component {
  editDelivery = (index) => {
    this.props.history.push(`/delivery/${index}/Edit`);
  };
  render() {
    const { deliveries } = this.props;
    return (
      <React.Fragment>
        <div className="row text-white">
          <div className="col-2 border bg-dark">Name</div>
          <div className="col-1 border bg-dark">Gender</div>
          <div className="col-2 border bg-dark">Slot</div>
          <div className="col-2 border bg-dark">Delivery</div>
          <div className="col-2 border bg-dark">Payment</div>
          <div className="col-1 border bg-dark"></div>
        </div>
        {deliveries.map((p1, index) => (
          <div className="row" key={index}>
            <div className="col-2 border">{p1.name}</div>
            <div className="col-1 border">{p1.gender}</div>
            <div className="col-2 border">{p1.slot}</div>
            <div className="col-2 border">{p1.delivery}</div>
            <div className="col-2 border">{p1.payments.join(",")}</div>
            <div className="col-1 border">
              <button
                className="btn btn-warning btn-sm"
                onClick={() => this.editDelivery(index)}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </React.Fragment>
    );
  }
}
export default DisplayDetails;
