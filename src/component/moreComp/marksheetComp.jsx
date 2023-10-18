import React, { Component } from "react";
class MarksheetComp extends Component {
  render() {
    const {
      markSheet,
      onSubmitAssginment,
      assignSub,
      jumpQuestion,
      check,
      questions,
      qInx,
    } = this.props;
    const columns = [];

    for (let i = 0; i <= questions.length - 1; i++) {
      const st = markSheet.findIndex((an) => an.ansQuestionInx === i);
      let ans = st >= 0 ? markSheet[st].ans : "";

      columns.push(
        <div
          key={i}
          className={
            check === 0
              ? questions[i].answer -1 === ans
                ? "col-1 bg-success m-1"
                : ans === ""
                ? "col-1 bg-warning m-1"
                : "col-1 bg-danger m-1"
              : (ans !== "" ?"col-1 bg-secondary m-1" : "col-1 bg-warning m-1")
          }
          style={{ width: "60px", height: "30px", borderRadius: "10%" }}
          onClick={() => jumpQuestion(i)}
        >
          {i + 1}.{" "}
          {ans === ""
            ? ""
            : ans === 0
            ? "A"
            : ans === 1
            ? "B"
            : ans === 2
            ? "C"
            : ans === 3
            ? "D"
            : ""}
        </div>
      );
    }

    return (
      <React.Fragment>
        <div className="row">
          {columns}
          <div>
            <button
              className="btn btn-secondary"
              onClick={() => onSubmitAssginment(assignSub)}
            >
              {check === 0 ? "List of Assignment" : "Submit the Assignment"}
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default MarksheetComp;
