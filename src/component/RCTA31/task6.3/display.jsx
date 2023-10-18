import React, { Component } from "react";
class Display extends Component {
  handleGoBack = () => {
    this.props.history.push("/");
  };
  handleEdit = (index) => {
    this.props.history.push(`/edit/${index}`);
  };
  handleDelete = (index) => {
    this.props.onDelete(index);
  };
  render() {
    const { details } = this.props;
    return (
      <div className="container">
        <h4>Course Details</h4>
        {details && details.length === 0 && <h4>No courses have been added</h4>}
        {details &&
          details.map((st, index) => (
            <div className="row" key={index}>
              <h5>
                Course Name: <strong>{st.courseName}</strong>
              </h5>
              <h5> Enrolled Students</h5>
              {st.students.map((st1, studentIndex) => (
                <div key={studentIndex}>
                  <p>Student Name: {st1.name}</p>
                  <p>Quiz 1 Grade: {st1.quiz1}</p>
                  <p>Quiz 2 Grade: {st1.quiz2}</p>
                </div>
              ))}
              <div className="col">
                <button
                  className="btn btn-warning"
                  onClick={() => this.handleEdit(index)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-warning"
                  onClick={() => this.handleDelete(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        <button className="btn btn-primary" onClick={() => this.handleGoBack()}>
          Add New
        </button>
      </div>
    );
  }
}
export default Display;
