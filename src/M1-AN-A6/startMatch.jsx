import React, { Component } from "react";

class StartMatch extends Component {
  render() {
    const { allMatches, selTeam1, selTeam2, onIncScore, onMatchOver } =
      this.props;
    let currMatch = allMatches.find(
      (k) => k.team1 === selTeam1 && k.team2 === selTeam2
    );
    console.log(currMatch);
    return (
      <div className="container text-center">
        <h3>Welcome to an exciting Match</h3>
        <div className="row">
          <div className="col-5">
            {selTeam1}
            <br />
            <button
              className="btn btn-warning btn-lg"
              onClick={() => onIncScore(selTeam1)}
            >
              Goal Scored
            </button>
          </div>
          <div className="col-2">
            {currMatch.scrTeam1}-{currMatch.scrTeam2}
          </div>
          <div className="col-5">
            {selTeam2}
            <br />
            <button
              className="btn btn-warning btn-lg"
              onClick={() => onIncScore(selTeam2)}
            >
              Goal Scored
            </button>
          </div>
        </div>
        <button
          className="btn btn-warning btn-lg text-center"
          onClick={() => onMatchOver()}
        >
          Match Over
        </button>
      </div>
    );
  }
}

export default StartMatch;
