import React, { Component } from "react";
import { ReactComponent as Croc } from "../component/animals/croc.svg";
import { ReactComponent as Giraffe } from "../component/animals/giraffe.svg";
import { ReactComponent as Elephant } from "../component/animals/elephant.svg";
import { ReactComponent as Gorilla } from "../component/animals/gorilla.svg";
import { ReactComponent as Koala } from "../component/animals/koala.svg";
import { ReactComponent as PolarBear } from "../component/animals/polarbear.svg";
import { ReactComponent as Tiger } from "../component/animals/tiger.svg";
import { ReactComponent as Whale } from "../component/animals/whale.svg";

class SetMainComponent3 extends Component {
  state = {
    cells: [
      { cellno: "croc", open: false },
      { cellno: "elephant", open: false },
      { cellno: "giraffe", open: false },
      { cellno: "croc", open: false },
      { cellno: "gorilla", open: false },
      { cellno: "koala", open: false },
      { cellno: "tiger", open: false },
      { cellno: "whale", open: false },
      { cellno: "tiger", open: false },
      { cellno: "polarbear", open: false },
      { cellno: "whale", open: false },
      { cellno: "giraffe", open: false },
      { cellno: "koala", open: false },
      { cellno: "elephant", open: false },
      { cellno: "polarbear", open: false },
      { cellno: "gorilla", open: false },
    ],
    open1: -1,
    open2: -1,
  };
  renderImage(cellno) {
    switch (cellno) {
      case "croc":
        return <Croc />;
      case "elephant":
        return <Elephant />;
      case "giraffe":
        return <Giraffe />;
      case "gorilla":
        return <Gorilla />;
      case "koala":
        return <Koala />;
      case "polarbear":
        return <PolarBear />;
      case "tiger":
        return <Tiger />;
      case "whale":
        return <Whale />;
      default:
        return null;
    }
  }
  handleOpen = (index) => {
    const { cells, open1, open2 } = this.state;
    const updatedCells = [...cells];

    if (updatedCells[index].open && (open1 !== -1 && open2 !== -1)) {
      console.log("hiiiii");
      return;
    }
    updatedCells[index].open = true;

    if (open1 !== -1) {
      if (updatedCells[open1].cellno === updatedCells[index].cellno) {
        this.setState(
          {
            cells: updatedCells,
            open1: -1,
            open2: -1,
          },
          () => {
            setTimeout(() => {
              this.doCellsMatching(open1, index);
            }, 1000);
          }
        );
      } else {
        updatedCells[index].open = true;
        this.setState(
          {
            cells: updatedCells,
            open2: index,
          },
          () => {
            setTimeout(() => {
              this.doCellsMatching(open1, index);
            }, 1000);
          }
        );
      }
    } else {
      this.setState({
        cells: updatedCells,
        open1: index,
      });
    }
  };

  doCellsMatching = (open1, open2) => {
    const { cells } = this.state;
    const updatedCells = [...cells];

    if (updatedCells[open1].cellno === updatedCells[open2].cellno) {
      updatedCells[open1].cellno = null;
      updatedCells[open2].cellno = null;
      console.log("hiiiii123");
    } else {
      updatedCells[open1].open = false;
      updatedCells[open2].open = false;
    }
    console.log("1", updatedCells[open1].open, "2", updatedCells[open2].open);

    this.setState({
      cells: updatedCells,
      open1: -1,
      open2: -1,
    });
  };

  handleReset = () => {
    let s1 = { ...this.state };
    s1.cells = [
      { cellno: "croc", open: false },
      { cellno: "elephant", open: false },
      { cellno: "giraffe", open: false },
      { cellno: "croc", open: false },
      { cellno: "gorilla", open: false },
      { cellno: "koala", open: false },
      { cellno: "tiger", open: false },
      { cellno: "whale", open: false },
      { cellno: "tiger", open: false },
      { cellno: "polarbear", open: false },
      { cellno: "whale", open: false },
      { cellno: "giraffe", open: false },
      { cellno: "koala", open: false },
      { cellno: "elephant", open: false },
      { cellno: "polarbear", open: false },
      { cellno: "gorilla", open: false },
    ];
    s1.open1 = -1;
    s1.open2 = -1;
    this.setState(s1);
  };

  render() {
    const { cells, open1, open2 } = this.state;
    let count = cells.reduce((acc, curr) => {
      return curr.cellno === null && curr.open ? acc + 1 : acc;
    }, 0);
    return (
      <div className="container">
        <h5>{ count === 16 ? "Game Over" : ""}</h5>
        <div className="row" style={{ width: "600px", height: "480px" }}>
          {cells.map((k, index) => (
            <div
              className={"col-4 m-1"}
              style={{ width: "120px", height: "120px" }}
            >
              <button
                className={
                  open1 !== index && open2 !== index && k.cellno !== null
                    ? "btn btn-primary"
                    : (open1 === index || open2 === index) && k.cellno !== null
                    ? "btn"
                    : open1 === -1 && open2 === -1 && k.cellno === null
                    ? "btn btn-dark"
                    : "btn btn-dark "
                }
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "15%",
                  opacity: "0.5",
                }}
                onClick={() => this.handleOpen(index)}
              >
                {k.open === true ? this.renderImage(k.cellno) : null}
              </button>
            </div>
          ))}
        </div>
        <br />
        <button
          className="btn btn-primary m-2"
          onClick={() => this.handleReset()}
        >
          {count !== 16 ? "Reset Game" : "New Game"}
        </button>
      </div>
    );
  }
}

export default SetMainComponent3;
