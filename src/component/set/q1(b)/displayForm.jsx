import React, { Component } from "react";
class DisplayForm extends Component {
  state = {
    paper: "",
  };
  handleChange = (e) => {
    const { currentTarget: input } = e;
    let s1 = { ...this.state };
    s1[input.name] = input.value;
    this.setState(s1);
  };
  render() {
    const { papers } = this.props;
    let { paper } = this.state;
    let ppr = paper ? papers.findIndex((q) => q.name === paper) : "";
    let ques = ppr >= 0 ? papers[ppr] : {};
    return (
      <div className="container">
        <div className="form-group">
          <label>Paper</label>
          <select
            className="form-control"
            name="paper"
            value={paper}
            onChange={this.handleChange}
          >
            <option disabled value="">
              Choose paper
            </option>
            {papers.map((country, index) => (
              <option value={country.name}>{country.name}</option>
            ))}
          </select>
          {ques && ques.length !== 0 && <h4>Questions paper</h4>}
          {ques && ques.length !== 0 && <h5>Name : {paper}</h5>}
          {ques &&
            ques.questions.map((q, index) => (
              <li>
                Q{index + 1}. {q}
              </li>
            ))}
        </div>
      </div>
    );
  }
}
export default DisplayForm;
