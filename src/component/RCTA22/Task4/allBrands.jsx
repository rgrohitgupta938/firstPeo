import React, { Component } from "react";
import LeftPanelComp from "./leftPanelComp";
import queryString from "query-string";

class AllBrands extends Component {
  handleOptionChange = (pr) => {
    this.callURL("/allBrands", pr);
  };

  callURL = (url, pr) => {
    let searchString = this.makeSearchString(pr);
    this.props.history.push({
      pathname: url,
      search: searchString,
    });
  };
  addToQueryString = (str, paraName, paraValue) =>
    paraValue
      ? str
        ? `${str}&${paraName}=${paraValue}`
        : `${paraName}=${paraValue}`
      : str;
  filterParams = (arr, queryParams) => {
    let { RAM, ROM, price } = queryParams;
    arr = this.filterParam(arr, "RAM", RAM);
    arr = this.filterParam(arr, "ROM", ROM);
    arr = this.filterParam1(arr, "price", price);
    return arr;
  };
  filterParam1 = (arr, name, values) => {
    if (!values) return arr;
    let valuesArr = values.split(",");
    let arr1 =
      valuesArr[0] === "Below 10000"
        ? arr.filter((a1) => a1[name] < 10000)
        : arr.filter((a1) => a1[name] >= 10000);
    return arr1;
  };
  filterParam = (arr, name, values) => {
    if (!values) return arr;

    let valuesArr = values.split(",");
    let arr1 = arr.filter((a1) => valuesArr.find((val) => val === a1[name]));
    return arr1;
  };
  makeSearchString = (options) => {
    let { RAM, ROM, price } = options;
    let searchStr = "";
    searchStr = this.addToQueryString(searchStr, "ROM", ROM);
    searchStr = this.addToQueryString(searchStr, "RAM", RAM);
    searchStr = this.addToQueryString(searchStr, "price", price);
    return searchStr;
  };
  makeAllOptions = (arr) => {
    let json = {};
    json.RAM = this.getDifferentValues(arr, "RAM");
    json.ROM = this.getDifferentValues(arr, "ROM");
    json.priceOpt = ["Below 10000", "10000 or more"];
    return json;
  };
  getDifferentValues = (arr, name) =>
    arr.reduce(
      (acc, curr) =>
        acc.find((val) => val === curr[name]) ? acc : [...acc, curr[name]],
      []
    );
  render() {
    const { mobiles } = this.props;
    const queryParams = queryString.parse(this.props.location.search);
    let mobiles2 = this.filterParams(mobiles, queryParams);
    let allOptions = this.makeAllOptions(mobiles);
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-3 bg-light">
            <LeftPanelComp
              allOptions={allOptions}
              options={queryParams}
              onOptionChange={this.handleOptionChange}
            />
          </div>
          <div className="col-9">
            {mobiles2.map((mob) => (
              <div className="row border" key={mob.name}>
                <div className="col-3">{mob.name}</div>
                <div className="col-3">{mob.brand}</div>
                <div className="col-2">{mob.RAM}</div>
                <div className="col-2">{mob.ROM}</div>
                <div className="col-2">{mob.price}</div>
              </div>
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default AllBrands;
