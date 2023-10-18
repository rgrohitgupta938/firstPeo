import React, { Component } from "react";
import TestSetMainComp from "./testSetMainComp";
import MarksheetComp from "./marksheetComp";
class AssignmentTable extends Component {
  state = {
    assignment: [
      {
        subject: "General Knowledge",
        name: "4A",
        questions: [
          {
            text: "What is the capital of India",
            options: ["New Delhi", "London", "Paris", "Tokyo"],
            answer: 1,
          },
          {
            text: "What is the capital of Italy",
            options: ["Berlin", "London", "Rome", "Paris"],
            answer: 3,
          },
          {
            text: "What is the capital of China",
            options: ["Shanghai", "HongKong", "Shenzen", "Beijing"],
            answer: 4,
          },
          {
            text: "What is the capital of Nepal",
            options: ["Tibet", "Kathmandu", "Colombo", "Kabul"],
            answer: 2,
          },
          {
            text: "What is the capital of Iraq",
            options: ["Baghdad", "Dubai", "Riyadh", "Teheran"],
            answer: 1,
          },
          {
            text: "What is the capital of Bangladesh",
            options: ["Teheran", "Kabul", "Colomdo", "Dhaka"],
            answer: 4,
          },
          {
            text: "What is the capital of Sri Lanka",
            options: ["Islamabad", "Colombo", "Maldives", "Dhaka"],
            answer: 2,
          },
          {
            text: "What is the capital of Saudi Arabia",
            options: ["Baghdad", "Dubai", "Riyadh", "Teheran"],
            answer: 1,
          },
          {
            text: "What is the capital of France",
            options: ["London", "New York", "Paris", "Rome"],
            answer: 3,
          },
          {
            text: "What is the capital of Germany",
            options: ["Frankfurt", "Budapest", "Prague", "Berlin"],
            answer: 4,
          },
          {
            text: "What is the capital of Sweden",
            options: ["Helsinki", "Stockholm", "Copenhagen", "Lisbon"],
            answer: 2,
          },
          {
            text: "What is the currency of UK",
            options: ["Dollar", "Mark", "Yen", "Pound"],
            answer: 4,
          },
          {
            text: "What is the height of Mount Everest",
            options: ["9231 m", "8848 m", "8027 m", "8912 m"],
            answer: 2,
          },
          {
            text: "What is the capital of Japan",
            options: ["Beijing", "Osaka", "Kyoto", "Tokyo"],
            answer: 4,
          },
          {
            text: "What is the capital of Egypt",
            options: ["Cairo", "Teheran", "Baghdad", "Dubai"],
            answer: 1,
          },
        ],
      },
      {
        subject: "Maths",
        name: "10C",
        questions: [
          {
            text: "What is 8 * 9",
            options: ["72", "76", "64", "81"],
            answer: 1,
          },
          {
            text: "What is 2*3+4*5",
            options: ["70", "50", "26", "60"],
            answer: 3,
          },
        ],
      },
      {
        subject: "Chemistry",
        name: "7A(i)",
        questions: [
          {
            text: "What is the melting point of ice",
            options: ["0F", "0C", "100C", "100F"],
            answer: 2,
          },
          {
            text: "What is the atomic number of Oxygen",
            options: ["6", "7", "8", "9"],
            answer: 3,
          },
          {
            text: "What is the atomic number of Carbon",
            options: ["6", "7", "8", "9"],
            answer: 1,
          },
          {
            text: "Which of these is an inert element",
            options: ["Flourine", "Suphur", "Nitrogen", "Argon"],
            answer: 4,
          },
          {
            text: "What is 0 Celsius in Fahrenheit",
            options: ["0", "32", "20", "48"],
            answer: 2,
          },
        ],
      },
      {
        subject: "Computers",
        name: "3B",
        questions: [
          {
            text: "How many bytes are there in 1 kilobyte",
            options: ["16", "256", "1024", "4096"],
            answer: 3,
          },
          {
            text: "Who developed ReactJS",
            options: ["Facebook", "Google", "Microsoft", "Apple"],
            answer: 1,
          },
          {
            text: "Angular is supported by ",
            options: ["Facebook", "Google", "Microsoft", "Twitter"],
            answer: 2,
          },
          {
            text: "C# was developed by ",
            options: ["Amazon", "Google", "Microsoft", "Twitter"],
            answer: 3,
          },
          {
            text: "Bootstrap was developed by ",
            options: ["Apple", "Google", "Facebook", "Twitter"],
            answer: 4,
          },
          {
            text: "AWS is provided by ",
            options: ["Apple", "Amazon", "Microsoft", "Google"],
            answer: 2,
          },
          {
            text: "Azure is provided by ",
            options: ["Microsoft", "Amazon", "IBM", "Google"],
            answer: 1,
          },
          {
            text: "Angular is a framework that uses ",
            options: ["Java", "Python", "C#", "Typescript"],
            answer: 4,
          },
        ],
      },
    ],
    view: -1,
    qInx: 0,
    currAns: "",
    markSheet1: [],
    markSheet2: [],
    markSheet3: [],
    markSheet4: [],
    assignSub: "",
    check: -1,
    submit1: -1,
    submit2: -1,
    submit3: -1,
    submit4: -1,
  };
  handlePrevQuestion = () => {
    const { qInx, markSheet1, assignSub, markSheet2, markSheet3, markSheet4 } =
      this.state;
    const prevQInx = qInx - 1;

    if (prevQInx >= 0) {
      let markSheet =
        assignSub === "Computers"
          ? markSheet4
          : assignSub === "Chemistry"
          ? markSheet3
          : assignSub === "Maths"
          ? markSheet2
          : assignSub === "General Knowledge"
          ? markSheet1
          : [];
      const currAns =
        markSheet.find((item) => item.ansQuestionInx === prevQInx)?.ans || null;
      this.setState({
        qInx: prevQInx,
        currAns,
      });
    }
  };

  handleNextQuestion = () => {
    const {
      qInx,
      markSheet1,
      assignSub,
      markSheet2,
      markSheet3,
      markSheet4,
      assignment,
    } = this.state;
    const nextQInx = qInx + 1;
    const questions = assignment[0]?.questions || [];

    if (nextQInx < questions.length) {
      let markSheet =
        assignSub === "Computers"
          ? markSheet4
          : assignSub === "Chemistry"
          ? markSheet3
          : assignSub === "Maths"
          ? markSheet2
          : assignSub === "General Knowledge"
          ? markSheet1
          : [];
      const currAns =
        markSheet.find((item) => item.ansQuestionInx === nextQInx)?.ans || null;
      this.setState({
        qInx: nextQInx,
        currAns,
      });
    }
  };

  handleDo = (inx) => {
    let s1 = {...this.state};
    s1.assignSub= s1.assignment[inx].subject;
      s1.view = 1;
      s1.check=-1;
    this.setState(s1);
  };

  handleMarkSheet = () => {
    this.setState({
      view: 0,
    });
  };

  handleAnswer = (inx, currAns) => {
    const { qInx, markSheet1, assignSub, markSheet2, markSheet3, markSheet4 } =
      this.state;
    let markSheet =
      assignSub === "Computers"
        ? markSheet4
        : assignSub === "Chemistry"
        ? markSheet3
        : assignSub === "Maths"
        ? markSheet2
        : assignSub === "General Knowledge"
        ? markSheet1
        : [];

    const st = markSheet.findIndex((item) => +item.ansQuestionInx === +qInx);

    if (st >= 0) {
      markSheet[st].ans = inx;
    } else {
      markSheet.push({ ans: inx, ansQuestionInx: qInx });
    }

    this.setState({
      markSheet,
      currAns,
    });
  };
  handleSubmit = (str) => {
    let s1 = { ...this.state };
    let st = s1.assignment.findIndex((inx) => inx.subject === s1.assignSub);
    console.log(st,str);
    if (st >= 0) {
        console.log("hi");
      if (st === 0)  {s1.submit1 = st}
      if (st === 1) {s1.submit2 = st}
      if (st === 2)  {s1.submit3 = st}
      if (st === 3)  {s1.submit4 = st}
    }
    s1.check=0;
    s1.view = -1;
    s1.qInx = 0;
    this.setState(s1);
  };
  handleQuestion = (i) => {
    let s1 = { ...this.state };
    s1.view = 1;
    s1.qInx = i;
    this.setState(s1);
  };
  handleCheck = (ch, str) => {
    let s1 = { ...this.state };
    s1.check = 0;
    s1.view = 1;
    s1.assignSub = str;
    this.setState(s1);
  };

  render() {
    const {
      assignment,
      markSheet1,
      view,
      assignSub,
      currAns,
      qInx,
      markSheet2,
      markSheet3,
      markSheet4,
      check,
      submit1,
      submit2,
      submit3,
      submit4,
    } = this.state;

    const filteredAssignment = assignment.find(
      (as) => as.subject === assignSub
    );
    const questions = filteredAssignment ? filteredAssignment.questions : [];
    let markSheet =
      assignSub === "Computers"
        ? markSheet4
        : assignSub === "Chemistry"
        ? markSheet3
        : assignSub === "Maths"
        ? markSheet2
        : assignSub === "General Knowledge"
        ? markSheet1
        : [];
    let answered1 = markSheet1
      ? markSheet1.filter((k) => k.ans !== "").length
      : "";
    let answered2 = markSheet2
      ? markSheet2.filter((k) => k.ans !== "").length
      : "";
    let answered3 = markSheet3
      ? markSheet3.filter((k) => k.ans !== "").length
      : "";
    let answered4 = markSheet4
      ? markSheet4.filter((k) => k.ans !== "").length
      : "";
    console.log(answered1);

    return (
      <div className="container">
        {view === -1 && (
          <React.Fragment>
            <h3 className="text-center">Choose the Assignment</h3>
            <div className="row bg-dark text-white">
              <div className="col-3">Subject</div>
              <div className="col-2">Assignment</div>
              <div className="col-3">Performance</div>
              <div className="col-2"></div>
              <div className="col-2"></div>
            </div>
            {assignment.map((as, index) => (
              <div className="row border p-1" key={index}>
                <div className="col-3">{as.subject}</div>
                <div className="col-2">{as.name}</div>
                <div className="col-3">
                  {(index === 0
                    ? markSheet1.length
                    : index === 1
                    ? markSheet2.length
                    : index === 2
                    ? markSheet3.length
                    : markSheet4.length) > 0
                    ? (index === 0
                        ? markSheet1.length
                        : index === 1
                        ? markSheet2.length
                        : index === 2
                        ? markSheet3.length
                        : markSheet4.length) +
                      "/" +
                      as.questions.length
                    : "Not Done"}
                </div>
                <div className="col-2">
                  <button
                    className="btn btn-primary"
                    onClick={() => this.handleDo(index)}
                  >
                    Do
                  </button>
                </div>
                <div className="col-2">
                  {check === 0 &&
                    (submit1 === index ||
                      submit2 === index ||
                      submit3 === index ||
                      submit4 === index) && (
                      <button
                        className="btn btn-primary"
                        onClick={() => this.handleCheck(index, as.subject)}
                      >
                        Check
                      </button>
                    )}
                </div>
              </div>
            ))}
          </React.Fragment>
        )}
        {view === 1 && (
          <TestSetMainComp
            questions={questions}
            currAns={currAns}
            qInx={qInx}
            check={check}
            assignSub={assignSub}
            markSheet={markSheet}
            onAnswer={this.handleAnswer}
            onNextQues={this.handleNextQuestion}
            onPrevQues={this.handlePrevQuestion}
            onMarkSheet={this.handleMarkSheet}
          />
        )}
        {view === 0 && (
          <MarksheetComp
            markSheet={markSheet}
            onSubmitAssginment={this.handleSubmit}
            jumpQuestion={this.handleQuestion}
            questions={questions}
            qInx={qInx}
            check={check}
          />
        )}
      </div>
    );
  }
}

export default AssignmentTable;
