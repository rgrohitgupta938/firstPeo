import React from "react";
function Player(props) {
  console.log(props);
  let players = props.players;
  return (
    <div>
      {players.map((p) => (
        <div className="container">
          <div className="row text-primary">
            Name : {p.name}
            <br />
            Score : {p.score}
          </div>
          <button
            className="btn btn-success btn-sm"
            onClick={() => props.onclickScore(p.name)}
          >
            1 Point
          </button>
        </div>
      ))}
    </div>
  );
}

export default Player;
