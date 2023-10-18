import React, { Component } from "react";

class QuestionComp extends Component {
  render() {
    const { questions, qInx, onCheckAns, currAns, check } = this.props;

    if (!questions || questions.length === 0) {
      return <h5>No questions available.</h5>;
    }

    if (qInx < 0 || qInx >= questions.length) {
      return <h5>Invalid question index.</h5>;
    }

    const question = questions[qInx];

    return (
      <React.Fragment>
        <h5>{question && question.text}</h5>
        {question &&
          question.options &&
          question.options.map((opt, optIndex) => (
            <p
              key={optIndex}
              onClick={check === 0 ? null : () => onCheckAns(optIndex, opt)}
              style={{ cursor: "pointer" }}
            >
              {String.fromCharCode(65 + optIndex)}. {opt}
            </p>
          ))}
        <small className="m-2">
          Your Answer: {currAns === null ? "Not Answered" : String.fromCharCode(65 + currAns)}
        </small>
        <br />
        {check === 0 && (
          <small
            className={
              currAns === question.answer - 1 ? "text-success m-2" : "text-warning m-2"
            }
          >
            {currAns === question.answer - 1
                ? "Correct Answer"
                : `Incorrect Answer. Correct Answer is ${String.fromCharCode(
                    65 + question.answer - 1
                  )}`
              }
          </small>
        )}
      </React.Fragment>
    );
  }
}

export default QuestionComp;
