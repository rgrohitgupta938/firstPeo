import React, { Component } from "react";

class PointTable extends Component {
  state = {
    points: this.props.points,
  };

  handleSort = (srt) => {
    let sortedPoints = [...this.state.points];

    switch (srt) {
      case 0:
        sortedPoints.sort((p1, p2) => p1.team.localeCompare(p2.team));
        break;
      case 1:
        sortedPoints.sort((p1, p2) => p1.played - p2.played);
        break;
      case 2:
        sortedPoints.sort((p1, p2) => p1.won - p2.won);
        break;
      case 3:
        sortedPoints.sort((p1, p2) => p1.lost - p2.lost);
        break;
      case 4:
        sortedPoints.sort((p1, p2) => p1.drawn - p2.drawn);
        break;
      case 5:
        sortedPoints.sort((p1, p2) => p1.goalsFor - p2.goalsFor);
        break;
      case 6:
        sortedPoints.sort((p1, p2) => p1.goalsAgainst - p2.goalsAgainst);
        break;
      case 7:
        sortedPoints.sort((p1, p2) => p1.point - p2.point);
        break;
      default:
        break;
    }

    this.setState({ points: sortedPoints });
  };

  render() {
    const { points } = this.state;

    return (
      <React.Fragment>
        <h4 className="text-center">Points Table</h4>
        <div className="row border bg-dark text-light text-center">
          <div className="col-2" onClick={() => this.handleSort(0)}>
            Team
          </div>
          <div className="col-1" onClick={() => this.handleSort(1)}>
            Played
          </div>
          <div className="col-1" onClick={() => this.handleSort(2)}>
            Won
          </div>
          <div className="col-1" onClick={() => this.handleSort(3)}>
            Lost
          </div>
          <div className="col-1" onClick={() => this.handleSort(4)}>
            Drawn
          </div>
          <div className="col-2" onClick={() => this.handleSort(5)}>
            Goals For
          </div>
          <div className="col-2" onClick={() => this.handleSort(6)}>
            Goals Against
          </div>
          <div className="col-2" onClick={() => this.handleSort(7)}>
            Points
          </div>
        </div>
        {points.map((k) => {
          let { team, won, lost, played, point, goalsAgainst, goalsFor, drawn } =
            k;
          return (
            <div className="row border text-center">
              <div className="col-2">{team}</div>
              <div className="col-1">{played}</div>
              <div className="col-1">{won}</div>
              <div className="col-1">{lost}</div>
              <div className="col-1">{drawn}</div>
              <div className="col-2">{goalsFor}</div>
              <div className="col-2">{goalsAgainst}</div>
              <div className="col-2">{point}</div>
            </div>
          );
        })}
      </React.Fragment>
    );
  }
}

export default PointTable;
