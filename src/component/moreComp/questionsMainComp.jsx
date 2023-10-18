import React, { Component } from "react";
import QuestionForm from "./questionForm";
class QuestionsMainComp extends Component {
  state = {
    questions: [],
    view: -1,
    editInx: -1,
  };
  handleaddQues = () => {
    this.setState({
      view: 1,
    });
  };
  handleQues = (ques) => {
    let s1 = { ...this.state };
    console.log(ques);
    let pr =
      s1.editInx >= 0
        ? (s1.questions[s1.editInx] = ques)
        : s1.questions.push(ques);
    s1.view = -1;
    s1.editInx = -1;
    this.setState(s1);
  };
  handleHome = () => {
    this.setState({
      view: -1,
    });
  };
  handleQuestionBank = () => {
    this.setState({
      view: 2,
    });
  };
  handleDelete = (inx) => {
    let s1 = { ...this.state };
    s1.questions.splice(inx, 1);
    this.setState(s1);
  };
  handleEdit = (inx) => {
    let s1 = { ...this.state };
    s1.editInx = inx;
    s1.view = 1;
    this.setState(s1);
  };
  render() {
    const { view, questions, editInx } = this.state;
    let question = {
      text: "",
      options: ["", "", "", ""],
      answer: "",
    };
    console.log(questions);
    return (
      <div className="container">
        {(view === 1 || view === 2) && (
          <button
            className="btn btn-primary m-2"
            onClick={() => this.handleHome()}
          >
            Home
          </button>
        )}
        {view === -1 && (
          <React.Fragment>
            <button
              className="btn btn-primary m-2"
              onClick={() => this.handleaddQues()}
            >
              Add Questions
            </button>
            <button
              className="btn btn-primary m-2"
              onClick={() => this.handleQuestionBank()}
            >
              Question Bank
            </button>
          </React.Fragment>
        )}
        {view === 1 && (
          <QuestionForm
            question={editInx >= 0 ? (question = questions[editInx]) : question}
            onSubmit={this.handleQues}
            edit={editInx >= 0 ? true : false}
          />
        )}
        {view === 2 && (
          <React.Fragment>
            <h4>Question bank</h4>
            {questions.length !== 0 ? (
              questions.map((ques, index) => (
                <div className="conatiner">
                  <div className="row" key={index}>
                    <div>
                      Q.{index + 1}
                      {ques.text}
                      <button
                        className="btn btn-warning m-2"
                        onClick={() => this.handleEdit(index)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-warning m-2"
                        onClick={() => this.handleDelete(index)}
                      >
                        Delete
                      </button>
                    </div>
                    <ul>
                      {ques.options.map((opt, index) => (
                        <li key={index}>
                          {index === 0
                            ? "A"
                            : index === 1
                            ? "B"
                            : index === 2
                            ? "C"
                            : "D"}{" "}
                          {opt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))
            ) : (
              <div>No Questions have been added so far</div>
            )}
          </React.Fragment>
        )}
      </div>
    );
  }
}
export default QuestionsMainComp;
