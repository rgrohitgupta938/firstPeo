import React, { Component } from "react";
class MainComp extends Component {
  state = {
    teams: ["Superman", "Wonder Woman", "Thor", "Captain America", "Spiderman"],
    members: [
      "Jack",
      "Anita",
      "Mary",
      "Steve",
      "Bob",
      "Dave",
      "Edwards",
      "Joe",
      "Felix",
      "Nate",
      "Peter",
      "Pam",
      "Alice",
      "Wendy",
      "Tim",
      "James",
      "Kathy",
      "Anna",
    ],
    selTeams: [],
    selTeam: { team: "", teamMember: "" },
    selMembers: [],
    view: 0,
    searchMem: "",
    searchTeam: "",
  };
  handleChange = (e) => {
    const { currentTarget: input } = e;
    let s1 = { ...this.state };
    s1.selTeam[input.name] = input.value;
    this.setState(s1);
  };
  handleChange1 = (e) => {
    const { currentTarget: input } = e;
    const selectedMember = input.value;
    const selectedTeam = this.state.selTeams.find((team) =>
      team.members.includes(selectedMember)
    );
    const searchTeam = selectedTeam ? selectedTeam.team : "Not in a Team";
    this.setState({ searchMem: selectedMember, searchTeam });
  };
  handleAddMember = () => {
    const { selTeam } = this.state;
    if (selTeam.team && selTeam.teamMember) {
      let s1 = { ...this.state };
      let st = s1.selTeams.findIndex((st) => st.team === selTeam.team);
      if (st >= 0) {
        let selTeamObj = s1.selTeams[st];
        selTeamObj.members.push(selTeam.teamMember);
        s1.selTeams[st] = selTeamObj;
        s1.selMembers.push(selTeam);
      } else {
        let members = [];
        members.push(selTeam.teamMember);
        let newTeam = { team: selTeam.team, members: members };
        s1.selTeams.push(newTeam);
        s1.selMembers.push(selTeam);
      }
      s1.selTeam = { team: "", teamMember: "" };
      this.setState(s1);
    }
  };

  mainView = (team, teams, teamMember, selTeam, selTeams, members1) => {
    return (
      <div className="row">
        <div className="col-3">
          {" "}
          <div className="form-group">
            <select
              className="form-control"
              name="team"
              value={team}
              onChange={this.handleChange}
            >
              <option disabled value="">
                Choose Team
              </option>
              {teams.map((country, index) => (
                <option value={country} key={index}>
                  {country}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-3">
          {" "}
          <div className="form-group">
            <select
              className="form-control"
              name="teamMember"
              value={teamMember}
              onChange={this.handleChange}
            >
              <option disabled value="">
                Choose Members
              </option>
              {members1.map((country, index) => (
                <option value={country} key={index}>
                  {country}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-3">
          <button
            className="btn btn-primary"
            onClick={() => this.handleAddMember()}
          >
            {" "}
            Add Member to Team
          </button>
        </div>
        <div className="row border text-white bg-dark">
          <div className="col-3">Team</div>
          <div className="col">Members</div>
        </div>
        {selTeams.map((t, index1) => (
          <div className="row border" key={index1}>
            <div className="col-3">{t.team}</div>
            {t.members.map((m, index) => (
              <div
                key={index}
                className="col border m-2 text-center fw-bold"
                style={{
                  backgroundColor: "yellow",
                  maxWidth: "80px",
                  width: "max-content",
                  cursor: "pointer",
                }}
              >
                {m}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };
  searchView = (searchMem, members, searchTeam) => {
    return (
      <div className="row">
        <div className="row text-white bg-dark">Search for Member</div>
        <div className="row">
          <div className="col-3">
            <div className="form-group">
              <select
                className="form-control"
                name="searchMem"
                value={searchMem}
                onChange={this.handleChange1}
              >
                <option value="">Choose Members</option>
                {members.map((country, index) => (
                  <option value={country} key={index}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-3">Team: {searchTeam}</div>
        </div>
      </div>
    );
  };
  memberView = (selMembers) => {
    return (
      <div>
        <div className="row bg-dark text-white">
          <div className="col-3">Team</div>
          <div className="col-3">Member</div>
        </div>
        {selMembers.map((member, index) => (
          <div className="row" key={index}>
            <div className="col-3">{member.team}</div>
            <div className="col-3">{member.teamMember}</div>
          </div>
        ))}
      </div>
    );
  };

  handleView = (n) => {
    this.setState({ view: +n });
  };
  render() {
    const {
      selTeams,
      teams,
      members,
      selTeam,
      selMembers,
      view,
      searchMem,
      searchTeam,
    } = this.state;
    let { team, teamMember } = selTeam;
    let members1 =
      selMembers.length !== 0
        ? members.filter(
            (member) =>
              !selMembers.find((selMember) => selMember.teamMember === member)
          )
        : members;
    console.log(members1, selMembers);
    return (
      <div className="container">
        <button
          className="btn btn-primary m-1"
          onClick={() => this.handleView(0)}
        >
          Main View
        </button>
        <button
          className="btn btn-primary m-1"
          onClick={() => this.handleView(1)}
        >
          Search Member
        </button>
        <button
          className="btn btn-primary m-1"
          onClick={() => this.handleView(2)}
        >
          Main View
        </button>
        {view === 0 &&
          this.mainView(team, teams, teamMember, selTeam, selTeams, members1)}
        {view === 1 && this.searchView(searchMem, members, searchTeam)}
        {view === 2 && this.memberView(selMembers)}
      </div>
    );
  }
}
export default MainComp;
