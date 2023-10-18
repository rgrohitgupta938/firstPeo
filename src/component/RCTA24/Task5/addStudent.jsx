import React, { Component } from "react";
import http from "./httpService";
class AddStudent extends Component {
  state = {
    student: { name: "", city: "", garde: "", course: "" },
    courses: ["JS", "Angular", "React", "Node"],
    cities: ["London", "Paris", "Mumbai", "Tokyo"],
    grades: ["A", "B", "C", "D"],
    edit: false,
  };
  async componentDidMount(){
    this.fetchData();
  }
  async fetchData(){
    const {id} = this.props.match.params;
    if(id){
      let response = await http.get(`/svr/students/${id}`);
      let {data} = response;
      console.log("if",data);
      this.setState({student : data ,edit : true,});
    }else{
      let student = {name:"",course:"",city:"",grade:""};
      this.setState({student:student,edit:false})
    }
  }
  componentDidUpdate(prevProps,prevState){
    if(prevProps !== this.props){
        this.fetchData()
    }
  }
  handleChange = (e) => {
    const { currentTarget: input } = e;
    let s1 = { ...this.state };
    s1.student[input.name] = input.value;
    this.setState(s1);
  };
  async postData(url,obj){
    let response = await http.post(url,obj);
    console.log(response);
    this.props.history.push("/students");
  };
  async putData(url,obj){
    let response = await http.put(url,obj);
    console.log(response);
    this.props.history.push("/students");
  };
  handleSubmit = (e) => {
    e.preventDefault();
    let {student,edit} =  this.state;
    edit ?  this.putData(`/svr/students/${student.id}`,student) :
    this.postData("/svr/students",student);
  };
  render() {
    const {courses,grades,cities,edit} = this.state;
    let {name,city,grade,course} = this.state.student;
    return (
      <div className="container">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={this.handleChange}
            placeholder="Enter Name"
            readOnly={edit}
            value={name}
            style={{backgroundColor: edit ? "whitesmoke" : ""}}
          />
        </div>
        <div className="form-group">
          <label>Course</label>
          <select
            className="form-control"
            name="course"
            value={course}
            onChange={this.handleChange}
          >
            <option disabled value="">
              Select Course
            </option>
            {courses.map((n) => (
              <option key={n}>{n}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Grade</label>
          <select
            className="form-control"
            name="grade"
            value={grade}
            onChange={this.handleChange}
          >
            <option disabled value="">
              Select a Grade
            </option>
            {grades.map((n) => (
              <option key={n}>{n}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>City</label>
          <select
            className="form-control"
            name="city"
            value={city}
            onChange={this.handleChange}
          >
            <option disabled value="">
              Select a City
            </option>
            {cities.map((n) => (
              <option key={n}>{n}</option>
            ))}
          </select>
        </div>
        <button className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }
}
export default AddStudent;
