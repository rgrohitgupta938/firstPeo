import React, { Component } from "react";

class QuestionPaper extends Component {
  state = {
    questionPaper: this.props.questionPaper,
  };

  handleChange = (e) => {
    const { name, value, checked } = e.currentTarget;
    const { questionPaper } = this.state;

    if (name === "id") {
      let { id } = questionPaper;
      if (checked) {
        id = [...id, value];
      } else {
        id = id.filter((qid) => qid !== value);
      }
      this.setState((prevState) => ({
        questionPaper: {
          ...prevState.questionPaper,
          id,
        },
      }));
    } else {
      this.setState((prevState) => ({
        questionPaper: {
          ...prevState.questionPaper,
          [name]: value,
        },
      }));
    }
  };

  handleSubmit = () => {
    this.props.onSubmit(this.state.questionPaper);
  };

  render() {
    const { questions } = this.props;
    const { questionPaper } = this.state;
    const { id = [], name = "" } = questionPaper;

    return (
      <div className="container">
        <div className="form-group">
          <label>Name of Paper</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={this.handleChange}
            placeholder="Enter Paper's Name"
            value={name}
          />
        </div>
        {questions.map((ch) => (
          <div className="form-check" key={ch.id}>
            <input
              className="form-check-input"
              type="checkbox"
              name="id"
              checked={id.indexOf(ch.id.toString()) !== -1}
              value={ch.id}
              onChange={this.handleChange}
            />
            <label className="form-check-label">{ch.qnText}</label>
          </div>
        ))}
        <button className="btn btn-primary" onClick={this.handleSubmit}>
          Submit
        </button>
      </div>
    );
  }
}

export default QuestionPaper;
