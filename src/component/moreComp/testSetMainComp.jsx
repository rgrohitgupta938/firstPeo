import React, { Component } from "react";
import QuestionComp from "./questionComp";

class TestSetMainComp extends Component {
  handleAnswer = (inx, opt) => {
    const { qInx, markSheet, onAnswer } = this.props;
  
    const st = markSheet.findIndex((item) => +item.ansQuestionInx === +qInx);
  
    if (st >= 0) {
      markSheet[st].ans = inx;
    } else {
      markSheet.push({ ans: inx, ansQuestionInx: qInx });
    }
  
    const currAns =
      markSheet.findIndex((t) => t.ansQuestionInx === qInx) >= 0
        ? markSheet.find((t) => t.ansQuestionInx === qInx).ans
        : "";
  
    onAnswer(inx, currAns);
  };
  handleMarkSheet = () => {
    this.props.onMarkSheet();
  };

  render() {
    const { questions, currAns, qInx, markSheet, view,check,assignSub } = this.props;

    return (
      <div className="container">
        <h4 className="text-center">General Knowledge: {assignSub}</h4>
        <div className="row">
          <div className="col-2">
            <small>Time 5 mins</small>
          </div>
          <div className="col-8"></div>
          <div className="col-2">
            <small>Max Score: {questions.length}</small>
          </div>
        </div>
        {view !== -1 && (
          <React.Fragment>
            <div className="row">
              <div className="col-10 "></div>
              <div className="col-2">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={this.handleMarkSheet}
                >
                  View Marking Sheet
                </button>
              </div>
            </div>

            <h5>Question Number: {qInx + 1}</h5>
            <QuestionComp
              questions={questions}
              qInx={qInx}
              onCheckAns={this.handleAnswer}
              markSheet={markSheet}
              check = {check}
              currAns={currAns}
            />

            <div className="row">
              <div className="col-2">
                {qInx > 0 && (
                  <button
                    className="btn btn-primary btn-sm m-2"
                    onClick={this.props.onPrevQues}
                  >
                    Previous Question
                  </button>
                )}
              </div>
              <div className="col-8"></div>
              <div className="col-2">
                {qInx < questions.length - 1 && (
                  <button
                    className="btn btn-primary btn-sm m-2"
                    onClick={this.props.onNextQues}
                  >
                    Next Question
                  </button>
                )}
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default TestSetMainComp;
