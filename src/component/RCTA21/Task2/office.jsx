import React, { Component } from "react";
import { Link } from "react-router-dom";
class Office extends Component {
  render() {
    const { offices } = this.props;
    const { location } = this.props.match.params;
    let office1 = offices.find((office) => office.city === location);
    return (
      <div className="container">
        <h2>Welcome to the office of JX Company in Bengaluru</h2>
        <h4>Address : {office1.address}</h4>
        
      </div>
    );
  }
}
export default Office;
