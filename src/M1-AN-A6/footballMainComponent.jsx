import React, { Component } from "react";
import PointTable from "./pointTable";
import NewMatch from "./newMatch";
import AllMatches from "./allMatches";
import StartMatch from "./startMatch";
import NavBar from "./navbar";

class FootballMainComponent extends Component {
  state = {
    teams: ["France", "England", "Brazil", "Germany", "Argentina"],
    points: [
      {
        team: "France",
        played: 0,
        won: 0,
        lost: 0,
        drawn: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        point: 0,
      },
      {
        team: "England",
        played: 0,
        won: 0,
        lost: 0,
        drawn: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        point: 0,
      },
      {
        team: "Brazil",
        played: 0,
        won: 0,
        lost: 0,
        drawn: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        point: 0,
      },
      {
        team: "Germany",
        played: 0,
        won: 0,
        lost: 0,
        drawn: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        point: 0,
      },
      {
        team: "Argentina",
        played: 0,
        won: 0,
        lost: 0,
        drawn: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        point: 0,
      },
    ],
    allMatches: [],
    currView: -1,
    selTeam1: "",
    selTeam2: "",
  };
  handleNewMatch = () => {
    let s1 = { ...this.state };
    s1.currView = 0;
    this.setState(s1);
  };
  handleTeamSel1 = (inx) => {
    let s1 = { ...this.state };
    console.log(inx);
    s1.selTeam1 = s1.teams[inx];
    this.setState(s1);
  };
  handleTeamSel2 = (inx) => {
    let s1 = { ...this.state };
    s1.selTeam2 = s1.teams[inx];
    this.setState(s1);
  };
  handleStartMatch = () => {
    let s1 = { ...this.state };
    if (s1.selTeam1 === s1.selTeam2) return alert("Choose Different Teams");
    if (s1.selTeam1 === "" && s1.selTeam2 !== "") return alert("Selelct Team1");
    if (s1.selTeam1 !== "" && s1.selTeam2 === "") return alert("Selelct Team2");
    let pr = {
      team1: s1.selTeam1,
      team2: s1.selTeam2,
      scrTeam1: 0,
      scrTeam2: 0,
    };
    s1.allMatches.push(pr);
    s1.currView = 1;
    this.setState(s1);
  };
  handleScore = (str) => {
    let s1 = { ...this.state };
    let st = s1.allMatches.findIndex(
      (k) => k.team1 === s1.selTeam1 && k.team2 === s1.selTeam2
    );
    let pr = s1.allMatches[st];
    if (pr.team1 === str) {
      pr.scrTeam1 += 1;
      let teamIndex = s1.points.findIndex((point) => point.team === str);
      s1.points[teamIndex].goalsFor += 1;
      let opponentIndex = s1.points.findIndex(
        (point) => point.team === s1.selTeam2
      );
      s1.points[opponentIndex].goalsAgainst += 1;
    } else if (pr.team2 === str) {
      pr.scrTeam2 += 1;
      let teamIndex = s1.points.findIndex((point) => point.team === str);
      s1.points[teamIndex].goalsFor += 1;
      let opponentIndex = s1.points.findIndex(
        (point) => point.team === s1.selTeam1
      );
      s1.points[opponentIndex].goalsAgainst += 1;
    }
    s1.allMatches[st] = pr;
    this.setState(s1);
  };

  handleMatchOver = () => {
    const { selTeam1, selTeam2, allMatches, points } = this.state;

    if (selTeam1 === selTeam2) {
      return alert("Choose Different Teams");
    }
    if (selTeam1 === "") {
      return alert("Select Team 1");
    }
    if (selTeam2 === "") {
      return alert("Select Team 2");
    }

    const matchIndex = allMatches.findIndex(
      (match) => match.team1 === selTeam1 && match.team2 === selTeam2
    );

    const team1Index = points.findIndex((point) => point.team === selTeam1);
    const team2Index = points.findIndex((point) => point.team === selTeam2);

    const match = allMatches[matchIndex];
    const team1Points = points[team1Index];
    const team2Points = points[team2Index];

    team1Points.played += 1;
    team2Points.played += 1;
    team1Points.goalsFor += match.scrTeam1;
    team2Points.goalsFor += match.scrTeam2;
    team1Points.goalsAgainst += match.scrTeam2;
    team2Points.goalsAgainst += match.scrTeam1;

    if (match.scrTeam1 > match.scrTeam2) {
      team1Points.won += 1;
      team2Points.lost += 1;
      team1Points.point += 3;
    } else if (match.scrTeam1 < match.scrTeam2) {
      team1Points.lost += 1;
      team2Points.won += 1;
      team2Points.point += 3;
    } else {
      team1Points.drawn += 1;
      team2Points.drawn += 1;
      team1Points.point += 1;
      team2Points.point += 1;
    }

    this.setState({
      points: [...points],
      currView: -1,
    });
  };

  handlePointTable = () => {
    let s1 = { ...this.state };
    s1.currView = 3;
    this.setState(s1);
  };
  handleAllMacthes = () => {
    let s1 = { ...this.state };
    s1.currView = 2;
    this.setState(s1);
  };

  render() {
    const { teams, points, allMatches, currView, selTeam1, selTeam2 } =
      this.state;
    return (
      <div className="container">
        <NavBar allMatches={allMatches} />
        <button
          className="btn btn-primary btn-lg m-3"
          onClick={() => this.handleAllMacthes()}
        >
          All Matches
        </button>
        <button
          className="btn btn-primary btn-lg m-3"
          onClick={() => this.handlePointTable()}
        >
          Point Table
        </button>
        <button
          className="btn btn-primary btn-lg m-3"
          onClick={() => this.handleNewMatch()}
        >
          New Match
        </button>
        {currView === 0 && (
          <NewMatch
            teams={teams}
            onTeamSel1={this.handleTeamSel1}
            onTeamSel2={this.handleTeamSel2}
            selTeam1={selTeam1}
            selTeam2={selTeam2}
            onStartMatch={this.handleStartMatch}
          />
        )}
        {currView === 1 && (
          <StartMatch
            allMatches={allMatches}
            selTeam1={selTeam1}
            selTeam2={selTeam2}
            onIncScore={this.handleScore}
            onMatchOver={this.handleMatchOver}
          />
        )}
        {currView === 2 && <AllMatches allMatches={allMatches} />}
        {currView === 3 && <PointTable points={points} />}
      </div>
    );
  }
}
export default FootballMainComponent;
