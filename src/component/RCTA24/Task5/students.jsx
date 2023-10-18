import React, { Component } from "react";
import http from "./httpService";
import { Link } from "react-router-dom";
class Students extends Component {
  state = {
    students: [],
  };
  async fetchStudents(txt = "",col) {
    const response = txt !== ""
      ? await http.get(`/svr/students/course/${txt}`)
      : await http.get("/svr/students");
    const { data } = response;
    console.log(data,col);
    this.setState({
      students: data,
    });
  }
   componentDidMount() {
    let col = "mount";
    let txt = "";
    this.fetchStudents(txt,col);
  }
   componentDidUpdate(prevProps) {
    const { txt: prevTxt = "" } = prevProps.match.params;
    const { txt = "" } = this.props.match.params;
    let col = "update";
    if (prevTxt !== txt) {
      this.fetchStudents(txt,col);
    }
  }
  handleEdit = (inx) => {
    this.props.history.push(`/students/${+inx}/edit`);
  };
  
  handleDelete = (inx) => {
     this.props.history.push(`/students/${+inx}/delete`);
  };
  render() {
    const { students } = this.state;
    return (
      <div className="container">
        <h3>Welcome to STUDENT Page</h3>
        {students.map((st) => (
          <div className="row">
            <div className="col-1 border">
              <Link to={`/students/${st.id}`}>{st.id}</Link>
            </div>
            <div className="col-2 border">{st.name}</div>
            <div className="col-2 border">{st.course}</div>
            <div className="col-1 border">{st.grade}</div>
            <div className="col-2 border">{st.city}</div>
            <div className="col-1 border">
              <button
                className="btn btn-warning btn-sm"
                onClick={() => this.handleEdit(st.id)}
              >
                Edit
              </button>
            </div>
            <div className="col-1 border">
              <button
                className="btn btn-danger btn-sm"
                onClick={() => this.handleDelete(st.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
export default Students;
