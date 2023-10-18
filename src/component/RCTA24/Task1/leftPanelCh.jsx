import React, { Component } from "react";
class LeftPanelCh extends Component {
  handleChange = (e) => {
    let { currentTarget: input } = e;
    let options = { ...this.props.options };
    options[input.name] = this.updateCBs(
      options[input.name],
      input.checked,
      input.value
    );
    this.props.onOptionChange(options);
  };
  updateCBs = (inpVal, checked, value) => {
    let inpArr = inpVal ? inpVal.split(",") : [];
    if (checked) inpArr.push(value);
    else {
      let index = inpArr.findIndex((ele) => ele === value);
      if (index >= 0) inpArr.splice(index, 1);
    }
    return inpArr.join(",");
  };
  makeCheckBox = (arr, values, name, label, arr1) => {
    return (
      <React.Fragment>
        <label className="form-check-label fw-bold">{label}</label>
        {arr.map((ch) => {
          const refineOption =arr1 ? arr1.find((st) => st.refineValue === ch) : "";
          const totalNum = refineOption ? +(refineOption.totalNum) : '';
          return (
            <div className="form-check" key={ch}>
              <input
                className="form-check-input"
                type="checkbox"
                name={name}
                checked={values.includes(ch)}
                value={ch}
                onChange={this.handleChange}
              />
              <label className="form-check-label">
                {ch}
                ({totalNum})
              </label>
            </div>
          );
        })}
      </React.Fragment>
    );
  };
  render() {
    let { language = "", bestseller = "" } = this.props.options;
    let { languageArr, bestsellerArr, refineOptions } = this.props;
    let refBest = refineOptions.bestseller;
    let refLan = refineOptions.language;
    console.log(refLan, refBest);
    return (
      <React.Fragment>
        <div className="col-12">
          <h6 className="ms-2 mt-2">Options</h6>
        </div>
        <div className="col-12">
          <hr className="light"></hr>
        </div>
        <div className="col-12"> {this.makeCheckBox(  bestsellerArr, bestseller.split(","), "bestseller", "Bestseller", refBest
          )}
        </div>
        <div className="col-12">
          <hr className="light"></hr>
        </div>
        <div className="col-12">  {this.makeCheckBox( languageArr, language.split(","), "language", "Language", refLan )}
        </div>
      </React.Fragment>
    );
  }
}
export default LeftPanelCh;
