import React, { Component } from "react";
import queryString from "query-string";
import http from "./httpService";
import LeftPanel from "./leftPanel";
class MobPage extends Component {
  state = {
    mobiles: [],
    brands: ["Samsung", "Xiaomi", "Realme", "Apple"],
    rams: ["3GB", "4GB", "6GB", "8GB"],
    roms: ["32GB", "64GB", "128GB", "256GB"],
    oss: ["Android", "iOS"],
  };
  makeSearchString = (opt) => {
    let { ram = "", rom = "", brand = "" } = opt;
    let searchStr = "";
    searchStr = this.addToQueryString(searchStr, "ram", ram);
    searchStr = this.addToQueryString(searchStr, "rom", rom);
    searchStr = this.addToQueryString(searchStr, "brand", brand);
    return searchStr;
  };
  addToQueryString = (str, paramName, paramValue) =>
    paramValue
      ? str
        ? `${str}&${paramName}=${paramValue}`
        : `${paramName}=${paramValue}`
      : str;
  callURL = (url, opt) => {
    let searchString = this.makeSearchString(opt);
    this.props.history.push({
      pathname: url,
      search: searchString,
    });
  };
  async fetchData() {
    let { bran, ra, ro, os } = this.props.match.params;
    let queryParams = queryString.parse(this.props.location.search);
    let { ram = "", brand = "", rom = "" } = queryParams;
    console.log(queryParams);
    let searchStr = this.makeSearchString(queryParams);
    console.log(brand, ram, rom, os, searchStr);
    let response =
      !ra && !ro && !os && !bran
        ? await http.get(`/svr/mobile?${searchStr}`)
        : ra
        ? await http.get(`/svr/mobile/RAM/${ra}`)
        : ro
        ? await http.get(`/svr/mobile/ROM/${ro}`)
        : os
        ? await http.get(`/svr/mobile/OS/${os}`)
        : bran
        ? await http.get(`/svr/mobile/brand/${bran}`)
        : "";
    let { data } = response;
    console.log(data);
    this.setState({
      mobiles: data,
    });
  }
  async componentDidMount() {
    this.fetchData();
  }
  async componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) this.fetchData();
    if (prevProps.match.params !== this.props.match.params) this.fetchData();
  }
  handleEdit = (st) => {
    this.props.history.push(`/mobile/${st}`);
  };
  handleDelete = async (st) => {
    let res = await http.deleteApi(`/svr/mobile/del/${st}`);
    console.log(st);
    if (res.status === 200) {
      setTimeout(() => {
        this.fetchData();
      }, 1);
    }
  };
  handleSort = (n) => {
    let emp1 = [...this.state.mobiles];
    switch (n) {
      case 0: // Name
        emp1.sort((p1, p2) => p1.name.localeCompare(p2.name));
        break;
      case 1: // price
        emp1.sort((p1, p2) => p1.price - p2.price);
        break;
      case 2: // brand
        emp1.sort((p1, p2) => p1.brand.localeCompare(p2.brand));
        break;
      case 3: // ram
        emp1.sort(
          (p1, p2) => +p1.ram.substring(0, 1) - +p2.ram.substring(0, 1)
        );
        break;
      case 4: // rom
        emp1.sort((p1, p2) => {
          const pp1 = +p1.rom.substring(0, p1.rom.length - 2);
          const pp2 = +p2.rom.substring(0, p2.rom.length - 2);
          console.log(pp1, pp2);
          return pp1 - pp2;
        });
        break;
      case 5: // os
        emp1.sort((p1, p2) => p1.os.localeCompare(p2.os));
        break;
      default:
        break;
    }
    this.setState({ mobiles: emp1 });
  };
  handleOptionChange = (opt) => {
    this.callURL("/mobile", opt);
  };
  render() {
    const { mobiles, rams, roms, oss, brands } = this.state;
    let queryParams = queryString.parse(this.props.location.search);
    let { ram = "", brand = "", rom = "" } = queryParams;
    let { bran, ra, ro, os } = this.props.match.params;
    let emp = mobiles;
    emp = ram ? emp.filter((st) => ram.split(",").includes(st.ram)) : emp;
    emp = rom ? emp.filter((st) => rom.split(",").includes(st.rom)) : emp;
    emp = brand ? emp.filter((st) => brand.split(",").includes(st.brand)) : emp;
    console.log(ram.split(","), rom, brand);
    return (
      <div className="container">
        <div className="row">
          {!bran && !os && !ra && !ro && (
            <div className="col-3">
              <LeftPanel
                rams={rams}
                roms={roms}
                oss={oss}
                brands={brands}
                options={queryParams}
                onOptionChange={this.handleOptionChange}
              />
            </div>
          )}
          <div className={bran && os && ra && ro ? "col-12" : "col-9"}>
            <div className="row border text-center text-white bg-dark">
              <div className="col-1" onClick={() => this.handleSort(0)}>
                Name
              </div>
              <div className="col-2" onClick={() => this.handleSort(1)}>
                Price
              </div>
              <div className="col-2" onClick={() => this.handleSort(2)}>
                Brand
              </div>
              <div className="col-2" onClick={() => this.handleSort(3)}>
                RAM
              </div>
              <div className="col-1" onClick={() => this.handleSort(4)}>
                ROM
              </div>
              <div className="col-2" onClick={() => this.handleSort(5)}>
                OS
              </div>
              <div className="col-2"></div>
            </div>
            {emp.map((e) => {
              let { name, brand, price, ram, rom, os, id } = e;
              console.log();
              return (
                <div className="row border text-center">
                  <div className="col-1">{name}</div>
                  <div className="col-2">{price}</div>
                  <div className="col-2">{brand}</div>
                  <div className="col-2">{ram}</div>
                  <div className="col-1">{rom}</div>
                  <div className="col-2">{os}</div>
                  <div className="col-2">
                    <button
                      className="btn btn-warning btn-sm m-1"
                      onClick={() => this.handleEdit(+id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm m-1"
                      onClick={() => this.handleDelete(+id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
export default MobPage;
