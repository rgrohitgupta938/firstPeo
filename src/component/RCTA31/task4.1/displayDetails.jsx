import React, { Component } from "react";
class DisplayDetails extends Component {
  addPerson = () => {
    this.props.history.push(`/persons/add`);
  };
  editPerson = (index) => {
    this.props.history.push(`/persons/${index}/Edit`);
  };
  render() {
    const { persons } = this.props;
    return (
      <React.Fragment>
        <h4>Details of persons</h4>
        {persons.map((p1, index) => (
          <div className="row" key={index}>
            <div className="col-2 border">{p1.name}</div>
            <div className="col-1 border">{p1.age}</div>
            <div className="col-2 border">{p1.country}</div>
            <div className="col-2 border">{p1.tech.join(",")}</div>
            <div className="col-2 border">{p1.currentStatus}</div>
            <div className="col-1 border">
              <button
                className="btn btn-warning btn-sm"
                onClick={() => this.editPerson(index)}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
        <button
          className="btn btn-primary mr-3"
          onClick={() => this.addPerson()}
        >
          Add New
        </button>
      </React.Fragment>
    );
  }
}
export default DisplayDetails;
