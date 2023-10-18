import React, { Component } from "react";

class ViewPaper extends Component {
  state = {
    selectedPaper: null,
  };
  handleChange = (e) => {
    const { value } = e.currentTarget;
    this.setState({
      selectedPaper: value,
    });
  };
  render() {
    const { questionPapers,questions } = this.props;
    const { selectedPaper } = this.state;
    let paper = null;

    if (selectedPaper) {
      paper = questionPapers.find((n) => n.name === selectedPaper);
    }

    return (
      <div className="container">
        <div className="form-group">
          <label>Papers</label>
          <select
            className="form-control"
            name="papers"
            value={selectedPaper || ""}
            onChange={this.handleChange}
          >
            <option disabled value="">
              Select the Paper
            </option>
            {questionPapers.map((n) => (
              <option key={n.name}>{n.name}</option>
            ))}
          </select>
        </div>
        {paper && (<h4>Question Paper</h4>)}
        {paper && (
          <div>
            Name: {paper.name}
            <ul>
              {paper.id.map((i,index) => (
                <li key={i}>Q {index+1}{ " "}{questions.find((que) => +(que.id) === +i).qnText}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}
export default ViewPaper;
