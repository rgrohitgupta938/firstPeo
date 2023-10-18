import React, { Component } from "react";
import Cell from "./cell";

class SetMainComponent2 extends Component {
  state = {
    cells: [
      { cellno: 1, cellvalue: -1 },
      { cellno: 2, cellvalue: -1 },
      { cellno: 3, cellvalue: -1 },
      { cellno: 4, cellvalue: -1 },
      { cellno: 5, cellvalue: -1 },
      { cellno: 6, cellvalue: -1 },
      { cellno: 7, cellvalue: -1 },
      { cellno: 8, cellvalue: -1 },
      { cellno: 9, cellvalue: -1 },
    ],
    move: 1,
  };

  handleCell = (index) => {
    const { cells, move } = this.state;
    const updatedCells = [...cells];
    const cell = updatedCells[index];

    if (cell.cellvalue === -1) {
      cell.cellvalue = move;
      const newMove = move === 1 ? 0 : 1;
      this.setState({ cells: updatedCells, move: newMove });
    }
  };

  resetGame = () => {
    this.setState({
      cells: [
        { cellno: 1, cellvalue: -1 },
        { cellno: 2, cellvalue: -1 },
        { cellno: 3, cellvalue: -1 },
        { cellno: 4, cellvalue: -1 },
        { cellno: 5, cellvalue: -1 },
        { cellno: 6, cellvalue: -1 },
        { cellno: 7, cellvalue: -1 },
        { cellno: 8, cellvalue: -1 },
        { cellno: 9, cellvalue: -1 },
      ],
      move: 1,
    });
  };

  render() {
    const { cells, move } = this.state;
    let sum = 0;
    let check = cells.map((k) => {
      k.cellvalue !== -1 ? (sum += 1) : (sum += 0);
    });
    console.log(sum);
    return (
      <div className="container">
        {sum === 9 ? "Game Over" : move === 1 ? "Move: X" : "Move: O"}
        <Cell cells={cells} onClickFunction={this.handleCell} />
        <button className="btn btn-primary m-2" onClick={this.resetGame}>
          {sum === 9 ? "New Game" : "Reset Game"}
        </button>
      </div>
    );
  }
}

export default SetMainComponent2;
