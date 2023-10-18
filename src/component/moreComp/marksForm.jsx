import React, { Component } from "react";
class MarksForm extends Component {
  state = {
    markArr: this.props.markArr,
  };

  handleChange = (e) => {
    console.log(e.currentTarget);
    let s1 = { ...this.state };
    s1.markArr[e.currentTarget.name] = e.currentTarget.value
    this.setState(s1);
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.markArr);
  };

  render() {
    let { name, comp, eng, maths, sci } = this.state.markArr;
    
    console.log(name);
    return (
      <div className="container">
        <h5>{this.props.edit?"Edit Marks for":"Enter Marks For"} {name}</h5>
        <div className="form-group">
          <label>Maths</label>
          <input
            type="number"
            className="form-control"
            id="maths"
            name="maths"
            onChange={this.handleChange}
            placeholder="Enter Maths Marks"
            value={maths}
          />
        </div>
        <div className="form-group">
          <label>English</label>
          <input
            type="number"
            className="form-control"
            id="eng"
            name="eng"
            onChange={this.handleChange}
            placeholder="Enter English Marks"
            value={eng}
          />
        </div>
        <div className="form-group">
          <label>Computer</label>
          <input
            type="number"
            className="form-control"
            id="comp"
            name="comp"
            onChange={this.handleChange}
            placeholder="Enter Computers Marks"
            value={comp}
          />
        </div>
        <div className="form-group">
          <label>Science</label>
          <input
            type="number"
            className="form-control"
            id="sci"
            name="sci"
            onChange={this.handleChange}
            placeholder="Enter Science Marks"
            value={sci}
          />
        </div>
        <button className="btn btn-primary" onClick={this.handleSubmit}>
          Submit
        </button>
      </div>
    );
  }
}
export default MarksForm;
