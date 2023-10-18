import React, { Component } from "react";

class ShowStoreOptions extends Component {
  handleChange = (e) => {
    const { currentTarget: input } = e;
    let options = { ...this.props.options };
    options[input.name] = input.value;
    this.props.onOptionChange(options);
  };

  render() {
    let { location = "" } = this.props.options;
    const { stores } = this.props;
    const locationsArr = stores.reduce((acc, curr) => {
      const location = curr.location;
      if (!acc.includes(location)) {
        return [...acc, location];
      }
      return acc;
    }, []);
    console.log(locationsArr);

    return (
      <div className="row m-2">
        <div className="col-4">
          <div className="form-group">
            <select
              className="form-control"
              name="location"
              value={location || false}
              onChange={this.handleChange}
            >
              <option key="" disabled value="">
                Select Location
              </option>
              {locationsArr.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-8"></div>
      </div>
    );
  }
}

export default ShowStoreOptions;
