import React, { Component } from "react";
class Mobile extends Component {
  render() {
    const { mobile1,index,onBuy } = this.props;
    const { name, desc1, desc2, desc3, price } = mobile1;
    return (
      <div className="col-3 text-center m-2 colrs">
        <h5>{name}({ desc1 })</h5>
        {desc2}{desc3 === "" ? "" : "|" + desc3}
        <br />
        <button className="btn btn-white bg-light" onClick={()=>onBuy(index)}>Just {price}</button>
      </div>
    );
  }
}
export default Mobile;
