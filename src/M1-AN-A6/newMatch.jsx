import React, { Component } from "react";
class NewMatch extends Component {
  render() {
    const { teams, onTeamSel1, onTeamSel2,onStartMatch,selTeam2,selTeam1} = this.props;
    return (
      <div>
        <h4 className="text-center">{selTeam1 === "" ? "Choose Team1" : "Team 1 :"+selTeam1}</h4>
        <div className="row justify-content-center">
          {teams.map((t, index) => (
            <div
              className="col-2 m-2 border bg-warning"
              onClick={() => onTeamSel1(index)}
            >
              {t}
            </div>
          ))}
        </div>
        <h4 className="text-center">{selTeam2 === "" ? "Choose Team 2" : "Team 2 :"+selTeam2}</h4>
        <div className="row justify-content-center">
          {teams.map((t, index) => (
            <div
              className="col-2 m-2 border bg-warning"
              onClick={() => onTeamSel2(index)}
            >
              {t}
            </div>
          ))}
        </div>
       <div class="text-center"><button className="btn btn-dark btn-lg text-center" onClick={() => onStartMatch()}>Start Match</button> </div>
      </div>
    );
  }
}
export default NewMatch;
