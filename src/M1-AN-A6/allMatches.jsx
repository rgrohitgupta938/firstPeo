import React, { Component } from "react";

class AllMatches extends Component {
  render() {
    const { allMatches } = this.props;
    
    return (
      <React.Fragment>
        {allMatches.length !== 0 ? (
          <React.Fragment>
            <h4>Results of the Matches so far</h4>
            <div className="row border bg-dark text-light">
              <div className="col-3">Team1</div>
              <div className="col-3">Team2</div>
              <div className="col-3">Score</div>
              <div className="col-3">Result</div>
            </div>
            {allMatches.map((k) => {
              let { team1, team2, scrTeam1, scrTeam2 } = k;
              return (
                <div className="row border">
                  <div className="col-3">{team1}</div>
                  <div className="col-3">{team2}</div>
                  <div className="col-3">
                    {scrTeam1}-{scrTeam2}
                  </div>
                  <div className="col-3">
                    {scrTeam1 > scrTeam2
                      ? team1 + " Won"
                      : scrTeam2 > scrTeam1
                      ? team2 + " Won"
                      : "Match Draw"}
                  </div>
                </div>
              );
            })}
          </React.Fragment>
        ) : (
          <h2 className="text-center">No matches so far</h2>
        )}
      </React.Fragment>
    );
  }
}

export default AllMatches;
