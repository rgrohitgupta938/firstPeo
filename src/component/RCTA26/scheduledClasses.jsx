import React, { Component } from "react";
import http from "../../services/httpService";
import auth from "../../services/authService";
import ScheduleClass from "./scheduleClass";
class ScheduledClasses extends Component {
  state = { classes: [], view: -1, editId: "" };
  async classes() {
    let response = await http.get(`/getFacultyClass/${auth.getUser().name}`);
    let { data } = response;
    console.log(data, response);
    this.setState({ classes: data });
  }
  componentDidMount() {
    this.classes();
  }
  handleEdit = (st) => {
    this.setState({
      view: 0,
      editId: st.classId,
    });
  };
  render() {
    console.log("check render");
    const { classes, view, editId } = this.state;
    return (
      <div className="container">
        {view === -1 && (
          <h4 className="text-dark m-2">
            {classes.length === 0
              ? "No Classes Scheduled"
              : "All Scheduled Classes"}
          </h4>
        )}
        {view === -1 && classes.length !== 0 && (
          <div
            className="row fw-bold p-2"
            style={{ backgroundColor: "lightgrey" }}
          >
            <div className="col-3">Course Name</div>
            <div className="col-2">Start Time</div>
            <div className="col-2">End Time</div>
            <div className="col-2">Topic</div>
            <div className="col-3"></div>
          </div>
        )}
        {view === -1 &&
          classes.length !== 0 &&
          classes &&
          classes.map((st) => {
            let { topic, endTime, time, course } = st;
            return (
              <React.Fragment>
                <div
                  className="row border p-2"
                  style={{ backgroundColor: "#ffeb99" }}
                >
                  <div className="col-3">{course}</div>
                  <div className="col-2">{time}</div>
                  <div className="col-2">{endTime}</div>
                  <div className="col-2">{topic}</div>
                  <div className="col-3">
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => this.handleEdit(st)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        {view === -1 && (
          <button className="btn btn-primary m-2">Add New Class</button>
        )}
        {view === 0 && <ScheduleClass editId={editId} />}
      </div>
    );
  }
}
export default ScheduledClasses;
