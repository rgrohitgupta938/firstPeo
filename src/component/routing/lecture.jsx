import React, { Component } from "react";
class Lecture extends Component {
  render() {
    const { courseName, lecid } = this.props.match.params;
    const { lectures } = this.props;
    let lecture = lectures.find((lect) => +(lect.id) === +(lecid));
    return (
      <React.Fragment>
        <h4>Lecture</h4>
        <h6>Id : {lecture.id}</h6>
        <h6>Course : {lecture.course}</h6>
        <h6>Topic : {lecture.topic}</h6>
      </React.Fragment>
    );
  }
}
export default Lecture;
