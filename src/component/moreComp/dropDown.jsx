import React, { Component } from "react";

class DropDown extends Component {
  state = {
    locs: [
      {
        country: "India",
        cities: ["New Delhi", "Mumbai", "Bangalore", "Chennai", "Pune"],
      },
      {
        country: "USA",
        cities: [
          "Los Angeles",
          "Chicago",
          "New York",
          "Seattle",
          "Washington DC",
        ],
      },
      { country: "France", cities: ["Paris", "Nice", "Lyon", "Cannes"] },
      { country: "Japan", cities: ["Tokyo", "Kyoto"] },
      { country: "China", cities: ["Shanghai", "Beijing", "Shenzhen"] },
    ],
    selCountry: "",
    selCity: "",
  };

  handleChange = (e) => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    const { selCountry, selCity } = this.state;
    alert("Country: " +selCountry +"  "+"City: "+selCity);
  };

  render() {
    const { locs, selCountry, selCity } = this.state;
    const selectedCountry = locs.find((k) => k.country === selCountry);

    return (
      <div className="container">
          <div className="form-group">
            <select
              className="form-control"
              name="selCountry"
              value={selCountry}
              onChange={this.handleChange}
            >
              <option disabled value="">
                Select the country
              </option>
              {locs.map((n) => (
                <option>{n.country}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <select
              className="form-control"
              name="selCity"
              value={selCity}
              onChange={this.handleChange}
            >
              <option disabled value="">
                Select the City
              </option>
              {selectedCountry && selectedCountry.cities.map((n) => (
                <option>{n}</option>
              ))}
            </select>
          </div>
          <button className="btn btn-primary" onClick={() => this.handleSubmit()}>
            Submit
          </button>
        
      </div>
    );
  }
}
export default DropDown;
