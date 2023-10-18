import React, { Component } from "react";

class SetComp1 extends Component {
  state = {
    alphabet: [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
    ],
    digits: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    special: ["@", "#", "$", "%", "&", "*", "(", ")"],
    view: -1,
    data: [],
    text:"",
  };
  showAlaphabet = (i) => {
    let s1 = { ...this.state };
    s1.data =
      i === 0 ? s1.alphabet.map((n) => (n = n.toUpperCase())) : s1.alphabet;
    s1.view = 0;
    console.log(s1.data);
    this.setState(s1);
  };
  showDigits = () => {
    let s1 = { ...this.state };
    s1.data = s1.digits;
    s1.view = 0;
    console.log(s1.data);
    this.setState(s1);
  };
  showSpecial = () => {
    let s1 = { ...this.state };
    s1.data = s1.special;
    s1.view = 0;
    console.log(s1.data);
    this.setState(s1);
  };
  clickKey = (inx) => {
    let s1 = { ...this.state };
    s1.text += s1.data[inx];
    console.log(s1.data);
    this.setState(s1);
  }

  render() {
    const { view, data,text } = this.state;
    let l = "";
    return (
      <div className="container text-center">
        <button
          className="btn btn-primary m-2"
          onClick={() => this.showAlaphabet(0)}
        >
          UpperCase
        </button>
        <button
          className="btn btn-primary m-2"
          onClick={() => this.showAlaphabet(1)}
        >
          LowerCase
        </button>
        <button
          className="btn btn-primary m-2"
          onClick={() => this.showDigits()}
        >
          Digits
        </button>
        <button
          className="btn btn-primary m-2"
          onClick={() => this.showSpecial()}
        >
          Social
        </button>
        <h4 className="border text-start">
          Text : {text}
        </h4>
        {view === 0 && (
          <React.Fragment>
            <div className="row bg-dark text-white">
              {data.map((k, index) => (
                <div
                  className="col-1 border"
                  onClick={() => this.clickKey(index)}
                >
                  {k}
                </div>
              ))}
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default SetComp1;
