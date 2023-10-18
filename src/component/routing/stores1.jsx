import React, { Component } from "react";
import { Link } from "react-router-dom";
class Stores1 extends Component {
  render() {
    const { lectures } = this.props;
    return (
      <div className="container">
        <h2>List of Lectures</h2>
        <ul>
          {lectures.map((lec) => (
            <li>
              Lecture Id :{" "}
              <Link to={`/lecture/${lec.course}/${lec.id}`}>{lec.id}</Link> ,
              Topic : {lec.topic} , Course Name : <Link to={`/course/${lec.course}`}>{lec.course}{" "}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
export default Stores1;
