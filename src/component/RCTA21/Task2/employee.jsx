import React, { Component } from "react";
import { Link } from "react-router-dom";
class Employee extends Component {
  render() {
    const { emps } = this.props;
    const { id } = this.props.match.params;
    let emp1 = emps.find((emp) => emp.id === id);
    return (
      <div className="container">
        <h2>Employee Deatils</h2>
        <h4>Employee id : {emp1.id}</h4>
        <h4>Name : {emp1.name}</h4>
        <h4>Department : <Link to={`/employees/dept/${emp1.dept}/1`}>{emp1.dept}</Link></h4>
        <h4>Designation : {emp1.designation}</h4>
        
      </div>
    );
  }
}
export default Employee;
