import React, { Component } from "react";
import { Link } from "react-router-dom";
class Stores extends Component {
  render() {
    const { stores,display } = this.props;
    const {loc,page} = this.props.match.params;
    let pageNum = +page;
    let size = 4;
    console.log(page,display,loc);
    let stores1 = display ? stores.filter((st) => st[display] === loc) : stores;
    let startInx = (pageNum - 1) * size;
    let endInx =
      stores1.length > startInx + size - 1
        ? startInx + size - 1
        : stores1.length - 1;
    let stores2 =
        stores1.length > 4
          ? stores1.filter((lt, index) => index >= startInx && index <= endInx)
          : stores1;
    return (
      <div className="container">
        <h6 className="m-2">
          Showing {startInx + 1} to {endInx + 1} of {stores1.length}
        </h6>
        <div className="row border bg-dark text-white">
          <div className="col-3 border">Id</div>
          <div className="col-3 border">Location</div>
          <div className="col-3 border">Email</div>
          <div className="col-3 border">Mobile</div>
        </div>
        {stores2.map((k) => (
          <div className="row border bg-light">
            <div className="col-3 border"><Link to={`/store/${k.id}`}>{k.id}</Link></div>
            <div className="col-3 border"><Link to={`/location/${k.location}/1`}>{k.location}</Link></div>
            <div className="col-3 border">{k.email}</div>
            <div className="col-3 border">{k.mobile}</div>
          </div>
        ))}
        <div className="row">
          <div className="col-2">
            {startInx > 0 ? <Link to={!display ? `/stores/${pageNum - 1}` : `/location/${loc}/${pageNum - 1}`}>Prev</Link> : ""}
          </div>
          <div className="col-8"></div>
          <div className="col-2">
            {endInx < stores1.length-1 ? (
              <Link to={!display ? `/stores/${pageNum + 1}` : `/location/${loc}/${pageNum + 1}`}>Next</Link>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default Stores;
