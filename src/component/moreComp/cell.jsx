import React, { Component } from "react";

class Cell extends Component {
  render() {
    const { cells, onClickFunction } = this.props;

    const rows = [];
    let cellsInRow = [];

    for (let i = 0; i < cells.length; i++) {
      const cell = cells[i].cellvalue;
      cellsInRow.push(
        <div
          className="col-4 border text-center"
          onClick={() => onClickFunction(i)}
          style={{ height: "60px", width: "60px" ,fontSize:"30px" }}
        >
          {cell === 1 ? "X" : cell === 0 ? "O" : "  "}
        </div>
      );

      if ((i + 1) % 3 === 0) {
        rows.push(<div className="row " style={{ width: "180px" ,backgroundColor:"#00ff99" }} >{cellsInRow}</div>);
        cellsInRow = [];
      }
    }

    return <div className="container">{rows}</div>;
  }
}

export default Cell;
