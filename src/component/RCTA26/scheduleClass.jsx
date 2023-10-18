import React, { Component } from "react";
import http from "../../services/httpService";
import auth from "../../services/authService";
class ScheduleClass extends Component {
  state = {
    class: { facultyName: "", topic: "", endTime: "", time: "", course: "" },
    courseNames: [],
    errors: {},
  };
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      class: {
        ...prevState.class,
        [name]: value,
        facultyName: auth.getUser().name,
      },
    }));
  };
  async getCourseDetails() {
    let response = await http.get(`/getFacultyClass/${auth.getUser().name}`);
    let { data } = response;
    data = data.find((f) => +f.classId === +this.props.editId);
    console.log(data, response, this.props.editId);
    this.setState({ class: data });
  }
  async getCourseNames() {
    let response = await http.get(`/getCourses`);
    console.log(response);
    let { data } = response;
    this.setState({
      courseNames: data.map((st) => {
        return st.name;
      }),
    });
    console.log(this.state.courseNames);
  }
  async postSchedule(url, obj, id) {
    const response = id
      ? await http.put(`${url}/${+id}`, obj)
      : await http.post(url, obj);
    console.log(response, `${url}/${id}`);
    !id
      ? alert("Class scheduled successfully:", obj)
      : alert("Class edited successfully:", obj);
    this.setState({
      class: {
        facultyName: "",
        topic: "",
        endTime: "",
        time: "",
        course: "",
      },
      errors: {},
    });
  }
  validateAll = () => {
    const { course, time, endTime, topic } = this.state.class;
    let errors = {};
    errors.course = this.validateCourse(course);
    errors.time = this.validateStime(time);
    errors.endTime = this.validateEtime(endTime);
    errors.topic = this.validateTopic(topic);
    return errors;
  };
  isValid = (errors) => {
    let keys = Object.keys(errors);
    let count = keys.reduce((acc, key) => (errors[key] ? acc + 1 : acc), 0);
    return count === 0;
  };
  validateCourse = (course) => {
    if (!course) {
      return "Select a Course";
    }
  };
  validateStime = (time) => {
    if (!time) {
      return "Class start time must be entered";
    }
  };
  validateEtime = (endTime) => {
    if (!endTime) {
      return "Class End time must be entered";
    }
  };
  validateTopic = (topic) => {
    if (!topic) {
      return "Class Topic must be Entered";
    }
  };
  componentDidUpdate(prevProps, prevState) {
    console.log("helloupdate");
    if (prevState.errors.succ !== this.state.errors.succ) {
      this.props.history.push("/scheduledClasses");
    }
  }
  componentDidMount() {
    console.log("hello");
    if (this.props.editId) {
      this.getCourseDetails();
    }
    this.getCourseNames();
  }
  handleSubmit = (e) => {
    e.preventDefault();
    console.log("Hanlde");
    let { class: classDetails } = this.state;
    let errors = this.validateAll();
    if (this.isValid(errors)) {
      console.log(classDetails);
      this.postSchedule(`/postClass`, classDetails, this.props.editId);
      errors = {};
      errors.succ = "Success";
      window.location = "/scheduledClasses";
    } else {
      let s1 = { ...this.state };
      s1.errors = errors;
      this.setState(s1);
    }
  };
  render() {
    let { courseNames, errors } = this.state;
    const {
      topic = "",
      endTime = "",
      time = "",
      course = "",
    } = this.state.class;
    return (
      <div className="container">
        <h4>
          {this.props.editId ? "Edit Deatils of Class" : "Schedule a class"}
        </h4>
        <div className="form-group">
          <select
            className="form-control"
            name="course"
            value={course}
            onChange={this.handleChange}
          >
            <option value="">Select the Course</option>
            {courseNames.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
          {errors && errors.course && (
            <span className="text-danger">{errors.course}</span>
          )}
        </div>
        <div className="form-group">
          <label>
            Time<span className="required-asterisk text-danger">*</span>
          </label>
          <input
            type="time"
            className="form-control"
            id="time"
            name="time"
            onChange={this.handleChange}
            placeholder="Enter Course Name"
            value={time}
          />
          {errors && errors.time && (
            <span className="text-danger">{errors.time}</span>
          )}
        </div>
        <div className="form-group">
          <label>
            End Time<span className="required-asterisk text-danger">*</span>
          </label>
          <input
            type="time"
            className="form-control"
            id="endTime"
            name="endTime"
            onChange={this.handleChange}
            placeholder="Enter Course Name"
            value={endTime}
          />
          {errors && errors.endTime && (
            <span className="text-danger">{errors.endTime}</span>
          )}
        </div>
        <div className="form-group">
          <label>
            Topic<span className="required-asterisk text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            id="topic"
            name="topic"
            onChange={this.handleChange}
            placeholder="Enter Course Name"
            value={topic}
          />
          {errors && errors.topic && (
            <span className="text-danger">{errors.topic}</span>
          )}
        </div>
        <button className="btn btn-primary mt-3" onClick={this.handleSubmit}>
          Schedule
        </button>
      </div>
    );
  }
}
export default ScheduleClass;
