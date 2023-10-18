import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import QuestionForm from "./questionForm";
class MainComp extends Component {
  state = {
    questions: [],
    view: -1,
    editIndex: -1,
  };
  handleSubmitQuestion = (ques, index) => {
    const { questions } = this.state;
    let questions1 = [...questions];
    index >= 0 ? (questions1[+index] = ques) : questions1.push(ques);
    this.setState({ questions: questions1, view: -1, editIndex: -1 });
    console.log(this.state.questions, index);
  };
  handleAddQues = () => {
    this.setState({ view: 1 });
  };
  handleQuesBank = () => {
    this.setState({ view: 2 });
  };
  handleHome = () => {
    this.setState({ view: -1 });
  };
  handleEdit = (inx) => {
    this.setState({ editIndex: inx, view: 1 });
  };
  handleDelete = (index) => {
    const { questions } = this.state;
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    this.setState({ questions: updatedQuestions });
  };

  render() {
    const { view, questions, editIndex } = this.state;
    return (
      <div className="container">
        {view === -1 && (
          <React.Fragment>
            {" "}
            <button
              className="btn btn-primary m-2"
              onClick={() => this.handleAddQues()}
            >
              Add Question
            </button>
            <button
              className="btn btn-primary m-2"
              onClick={() => this.handleQuesBank()}
            >
              Question Bank
            </button>
          </React.Fragment>
        )}
        {(view === 1 || view === 2) && (
          <button className="btn btn-primary" onClick={() => this.handleHome()}>
            Home
          </button>
        )}
        {editIndex < 0 && view === 1 && (
          <QuestionForm onSubmit={this.handleSubmitQuestion} view={view} />
        )}
        {editIndex >= 0 && view === 1 && (
          <QuestionForm
            onSubmit={this.handleSubmitQuestion}
            question={questions[editIndex]}
            editIndex={editIndex}
          />
        )}
        {view === 2 && questions && questions.length !== 0 && (
          <h4>Question Bank</h4>
        )}
        {view === 2 && questions && questions.length !== 0
          ? questions &&
            questions.map((st, index) => (
              <div className="row">
                <div className="col">
                  {`Q${index + 1}. ${st.qnText}`}
                  <button
                    className="btn btn-warning btnb-sm m-1"
                    onClick={() => this.handleEdit(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-warning btnb-sm m-1"
                    onClick={() => this.handleDelete(index)}
                  >
                    Delete
                  </button>
                </div>
                <br />
                <li>A. {st.A}</li>
                <li>B. {st.B}</li>
                <li>C. {st.C}</li>
                <li>D. {st.D}</li>
                <li>Answer. {st.ans}</li>
              </div>
            ))
          : view === 2 && <h4>No Questions have been added so far</h4>}
      </div>
    );
  }
}
export default MainComp;
