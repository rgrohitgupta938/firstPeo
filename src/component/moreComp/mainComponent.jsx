import React, { Component } from "react";
import SimpleForm2 from "./simpleForm2";
class MainComponent extends Component {
  state = {
    persons: [
      {
        name: "Jack",
        age: 23,
        gender: "Male",
        passport: true,
        license: "",
        country: "",
        passportNumber: "FGRRT54234",
        city: "",
        desigantion: "",
        techsKnown: [],
      },
      {
        name: "Anna",
        age: 31,
        gender: "Female",
        passport: false,
        license: "",
        country: "",
        passportNumber: "",
        city: "",
        desigantion: "",
        techsKnown: [],
      },
    ],
    view: 0,
    editPersonIndex: -1,
  };

  handlePerson = (person) => {
    console.log("In handle Person", person);
    let s1 = { ...this.state };
    s1.editPersonIndex >= 0
      ? (s1.persons[s1.editPersonIndex] = person)
      : s1.persons.push(person);
    s1.view = 0;
    s1.editPersonIndex = -1;
    this.setState(s1);
  };
  showForm = () => {
    let s1 = { ...this.state };
    s1.view = 1;
    this.setState(s1);
  };
  editPerson = (inx) => {
    let s1 = { ...this.state };
    s1.view = 1;
    s1.editPersonIndex = inx;
    this.setState(s1);
  };
  delPerson = (inx) => {
    let s1 = { ...this.state };
    s1.view = 0;
    s1.persons.splice(inx, 1);
    this.setState(s1);
  };

  render() {
    let person = { name: "", age: "",country:"" };
    let { persons, view, editPersonIndex } = this.state;
    return view === 0 ? (
      <div className="container">
        <h3>Deatils of Persons</h3>
        {persons.map((p1, index) => (
          <div className="row">
            <div className="col-4 border">{p1.name}</div>
            <div className="col-4 border">{p1.age}</div>
            <div className="col-4 border">
              <button
                className="btn btn-warning btn-sm m-2"
                onClick={() => this.editPerson(index)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger btn-sm m-2"
                onClick={() => this.delPerson(index)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        <button className="btn btn-primary" onClick={() => this.showForm()}>
          Add New Person
        </button>
      </div>
    ) : (
      <SimpleForm2
        person={editPersonIndex >= 0 ? persons[editPersonIndex] : person}
        onSubmit={this.handlePerson}
        edit={editPersonIndex >= 0}
      />
    );
  }
}
export default MainComponent;
