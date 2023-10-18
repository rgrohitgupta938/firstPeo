import React, { Component } from "react";
import StudentForm from "./studentForm";
import MarksForm from "./marksForm";
class HomeScreen extends Component {
  state = {
    students: [],
    marksArr: [],
    view: -1,
    marksEditIndex:-1,
    markStu: "",
  };
  showList = () => {
    this.setState({ view: 0,
         });
  };
  handleSubmit = (arr) => {
    let s1 = { ...this.state };
    s1.students.push(arr);
    s1.view = 0;
    this.setState(s1);
  };
  handleSubmit1 = (arr) => {
    let s1 = { ...this.state };
    let pr = s1.students.find((n) => n.name === arr.name);
    pr.totalmarks = +arr.comp + +arr.sci + +arr.maths + +arr.eng;
    s1.markStu = "";
    s1.marksEditIndex >= 0
      ? (s1.marksArr[s1.marksEditIndex] = arr)
      : s1.marksArr.push(arr);
    s1.marksEditIndex = -1;
    s1.view = 0;
    this.setState(s1);
  };
  addnew = () => {
    this.setState({ view: 1 });
  };
  edit = (str) => {
    let s1 = { ...this.state };
    let st = s1.marksArr.findIndex((n) => n.name === str);
    s1.view =2;
    s1.marksEditIndex = st;
    this.setState(s1);
  };
  enterTotalMarks = (inx) => {
    let s1 = { ...this.state };
    s1.markStu = s1.students[inx].name;
    s1.view = 2;
    this.setState(s1);
  };

  render() {
    const { students, view, editIndex, markStu, marksArr,marksEditIndex } = this.state;
    let student = { name: "", course: "", year: "" };
    let markArr = { maths: "", eng: "", sci: "", comp: "", name: markStu };
    return (
      <div className="container">
        <button className="btn btn-primary m-2" onClick={this.addnew}>
          New Student
        </button>
        <button className="btn btn-primary m-2" onClick={this.showList}>
          List of Students
        </button>

        {view === 0 ? (
          students.length === 0 ? (
            <p>There are Zero Students</p>
          ) : (
            <div className="conatiner">
              <div className="row border bg-dark text-white">
                <div className="col-3 border">Name</div>
                <div className="col-3 border">Course</div>
                <div className="col-2 border">Year</div>
                <div className="col-2 border">Total Marks</div>
                <div className="col-2 border">Result</div>
              </div>
              {students.map((k, index) => {
                let { name, course, year, totalmarks = "No Data" } = k;
                return (
                  <div className="row border">
                    <div className="col-3 border">{name}</div>
                    <div className="col-3 border">{course}</div>
                    <div className="col-2 border">{year}</div>
                    <div className="col-2 border">{totalmarks}</div>
                    {totalmarks !== "No Data" ? (
                        <div className="col-2 border">
                      <button className="btn btn-info btn-sm m-1" onClick={() => this.edit(name)}>Edit</button></div>
                    ) : (
                      <div className="col-2 border">
                        <button
                          className="btn btn-info btn-sm m-1"
                          onClick={() => this.enterTotalMarks(index)}
                        >
                          Enter
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )
        ) : view === 1 ? (
          <StudentForm
            student={student}
            onSubmit={this.handleSubmit}
          />
        ) : view === 2 ? (
          <MarksForm
            markArr={marksEditIndex >= 0 ? marksArr[marksEditIndex] : markArr}
            onSubmit={this.handleSubmit1}
            marksStu={markStu}
            edit ={marksEditIndex>=0}
          />
        ) : (
          <p>Welcome to the Student management System</p>
        )}
      </div>
    );
  }
}
export default HomeScreen;
