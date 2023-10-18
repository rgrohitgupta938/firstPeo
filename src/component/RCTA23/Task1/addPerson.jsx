import React, { Component } from "react";
import http from "../../RCTA24/Task5/httpService.js";
class AddPerson extends Component {
  state = {
    person:{name:"",age:"",city:"",company:""},
    cities:["London","Paris","New Delhi","Bangalore"],
    companies:["Apple","Google","Facebook","Microsoft","Tesla"],
    edit:false,
  };
  async componentDidMount(){
    this.fetchData();
  }
  async fetchData(){
    const {id} = this.props.match.params;
    if(id){
      let response = await http.get(`/personApp/persons/${id}`);
      let {data} = response;
      console.log("if",data);
      this.setState({person : data ,edit : true,});
    }else{
      let person = {name:"",age:"",city:"",company:""};
      this.setState({person:person,edit:false})
    }
  }
  handleChange = (e) => {
    const { currentTarget: input } = e;
    let s1 = { ...this.state };
    s1.person[input.name] = input.value;
    this.setState(s1);
  };
  async postData(url,obj){
    let response = await http.post(url,obj);
    console.log(response);
    this.props.history.push("/persons");
  };
  async putData(url,obj){
    let response = await http.put(url,obj);
    console.log(response);
    this.props.history.push("/persons");
  };
  handleSubmit = (e) => {
    e.preventDefault();
    let {person,edit} =  this.state;
    edit ?  this.putData(`/personApp/persons/${person.id}`,person) :
    this.postData("/personApp/persons",person);
  };
  render() {
    let { name,age,city,company } = this.state.person;
    let {cities,companies} = this.state;
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
            value={name}
          />
        </div>
        <div className="form-group">
          <label>Age</label>
          <input
            type="text"
            className="form-control"
            id="age"
            name="age"
            onChange={this.handleChange}
            placeholder="Enter Product Id"
            value={age}
          />
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
              Select city
            </option>
            {cities.map((n) => (
              <option key={n}>{n}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Company</label>
          <select
            className="form-control"
            name="company"
            value={company}
            onChange={this.handleChange}
          >
            <option disabled value="">
              Select Company
            </option>
            {companies.map((n) => (
              <option key={n}>{n}</option>
            ))}
          </select>
        </div>
        <button className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }
}
export default AddPerson;
