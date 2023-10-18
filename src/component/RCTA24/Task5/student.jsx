import React, { Component } from "react";
import http from "./httpService";
import { Link } from "react-router-dom";
class Student extends Component {
  state = {
    student: {},
  };
  async componentDidMount() {
    let { id } = this.props.match.params;
    let response = await http.get(`/svr/students/${id}`);
    let { data } = response;
    console.log(data);
    this.setState({
      student: data,
    });
  }

  render() {
    const { student } = this.state;
    let { id, grade, city, name, course } = student;
    return (
      <div className="container">
        Student Id : {id}
        <br />
        Name : {name}
        <br />
        Course : {course}
        <br />
        Grade : {grade}
        <br />
        City : {city}
        <br />
        <Link to={`/students/${id}/edit`}>Edit</Link>
        {"   "}
        <Link to={`/students/${id}/delete`}>Delete</Link>
      </div>
    );
  }
}
export default Student;
