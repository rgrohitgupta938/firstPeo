import React, { Component } from "react";
import http from "./httpService";
import { Link } from "react-router-dom";

class Details extends Component {
  state = {
    star: {},
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    console.log(id);
    const response = await http.get(`/sporticons/details/${id}`);
    console.log(response);
    this.setState({ star: response.data });
    console.log(this.state);
  }

  render() {
    const { star } = this.state;
    const { name, sport, details, country } = star;
    console.log(details);
    return (
      <div className="container">
        <h4>{name}</h4>
        {details && (
          <React.Fragment>
            <h6>Date of Birth : {details.dob}</h6>
            <h6>Sport : {sport}</h6>
            <h6>Country : {country}</h6>
            {details.info}
          </React.Fragment>
        )}
        <br />
        <Link to={`/stars/${sport && sport.toLowerCase()}`}>{sport} Stars</Link>
      </div>
    );
  }
}

export default Details;
