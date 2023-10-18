import React, { Component } from "react";
import { Link } from "react-router-dom";

class Offices extends Component {
  render() {
    const { offices } = this.props;
    return (
      <div className="container">
        <h2>List of Offices</h2>
        {offices.map((office, index) => (
          <div className="row" key={index}>
            <div className="col-3 border">
              <Link to={`/office/${office.city}`}>{office.city}</Link>
            </div>
            <div className="col-9 border">{office.address}</div>
          </div>
        ))}
      </div>
    );
  }
}

export default Offices;
