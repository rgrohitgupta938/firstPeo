import React, { Component } from "react";

class MainComp extends Component {
  state = {
    arr: [[2, 3, 4, 6, 7], [3, 4, 5], [5, 10], [14], [4, 8, 12, 16]],
    stats: [],
  };

  handleIncrement = () => {
    const newArray = this.state.arr.map((row) => row.map((value) => value + 1));
    this.setState({ arr: newArray }, this.updateStats);
  };

  handleDecrement = () => {
    const newArray = this.state.arr.map((row) => row.map((value) => value - 1));
    this.setState({ arr: newArray }, this.updateStats);
  };

  handleInsert22AtEnd = () => {
    const newArray = this.state.arr.map((row) => [...row, 22]);
    this.setState({ arr: newArray }, this.updateStats);
  };

  handleInsert0AtStart = () => {
    const newArray = this.state.arr.map((row) => [0, ...row]);
    this.setState({ arr: newArray }, this.updateStats);
  };

  handleRemove4OrLess = () => {
    const newArray = this.state.arr.map((row) =>
      row.filter((value) => value > 4)
    );
    this.setState({ arr: newArray }, this.updateStats);
  };

  handleDoubleValue = (rowIndex, colIndex) => {
    const newArray = [...this.state.arr];
    newArray[rowIndex][colIndex] *= 2;
    this.setState({ arr: newArray }, this.updateStats);
  };
  calculateStats = (array) => {
    const sum = array.reduce((acc, val) => acc + val, 0);
    const max = Math.max(...array);
    const min = Math.min(...array);
    const count = array.length;
    return { sum, max, min, count };
  };

  updateStats = () => {
    const { arr } = this.state;
    const stats = arr.map((array) => this.calculateStats(array));
    this.setState({ stats });
  };
  render() {
    const { arr, stats } = this.state;
    console.log(stats);
    return (
      <div className="container">
        {arr.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((value, colIndex) => (
              <div
                key={colIndex}
                className="col border m-1"
                style={{
                  backgroundColor: "yellow",
                  maxWidth: "40px",
                  width: "max-content",
                  cursor: "pointer",
                }}
                onClick={() => this.handleDoubleValue(rowIndex, colIndex)}
              >
                {value}
              </div>
            ))}
          </div>
        ))}
        <div className="mb-3">
          <button
            className="btn btn-primary btn-sm m-1"
            onClick={this.handleIncrement}
          >
            +1
          </button>
          <button
            className="btn btn-primary btn-sm m-1"
            onClick={this.handleDecrement}
          >
            -1
          </button>
          <button
            className="btn btn-primary btn-sm m-1"
            onClick={this.handleInsert22AtEnd}
          >
            Insert 22 at End
          </button>
          <button
            className="btn btn-primary btn-sm m-1"
            onClick={this.handleInsert0AtStart}
          >
            Insert 0 at Start
          </button>
          <button
            className="btn btn-primary btn-sm m-1"
            onClick={this.handleRemove4OrLess}
          >
            Remove 4 or less
          </button>
        </div>
        {stats.length !== 0 && <h4>Stats for each row</h4>}
        {stats &&
          stats.map((st) => (
            <div className="row">
              Sum : {st.sum} Count : {st.count} Max : {st.max} Min : {st.min}
            </div>
          ))}
      </div>
    );
  }
}

export default MainComp;
