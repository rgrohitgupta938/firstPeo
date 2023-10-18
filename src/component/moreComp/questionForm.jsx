import React, { Component } from "react";

class QuestionForm extends Component {
  state = {
    question: this.props.question,
  };

  handleChange = (e) => {
    const { name, value } = e.currentTarget;
    const { question } = this.state;
  
    if (name.startsWith("options")) {
      const optionIndex = parseInt(name.split("[")[1].split("]")[0], 10);
      const updatedOptions = [...question.options];
      updatedOptions[optionIndex] = value;
  
      this.setState((prevState) => ({
        question: {
          ...prevState.question,
          options: updatedOptions,
        },
      }));
    } else {
      this.setState((prevState) => ({
        question: {
          ...prevState.question,
          [name]: value,
        },
      }));
    }
  };
  

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.question);
    this.props.onSubmit(this.state.question);
  };

  render() {
    const { question } = this.state;
    const { text, options, answer } = question;

    return (
      <div className="container">
        <div className="form-group">
          <label htmlFor="text">Question</label>
          <input
            type="text"
            className="form-control"
            id="text"
            name="text"
            onChange={this.handleChange}
            placeholder="Enter Question"
            value={text}
          />
        </div>
        {options.map((option, index) => (
          <div className="form-group" key={index}>
            <label htmlFor={`options[${index}]`}>{`Option ${String.fromCharCode(
              65 + index
            )}`}</label>
            <input
              type="text"
              className="form-control"
              id={`options[${index}]`}
              name={`options[${index}]`}
              onChange={this.handleChange}
              placeholder={`Enter Option ${String.fromCharCode(65 + index)}`}
              value={option || ""}
            />
          </div>
        ))}
        <div className="form-group">
          <label htmlFor="answer">Correct Option</label>
          <input
            type="text"
            className="form-control"
            id="answer"
            name="answer"
            onChange={this.handleChange}
            placeholder="Enter Correct Option"
            value={answer || ""}
          />
        </div>
        <button className="btn btn-primary" onClick={this.handleSubmit}>
          {this.props.edit !== true ? "Submit" : "Edit"}
        </button>
      </div>
    );
  }
}

export default QuestionForm;
