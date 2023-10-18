import React, { Component } from "react";
import http from "./httpService";
class NewCar extends Component {
  state = {
    car: { id: "", price: "", kms: "", year: "", model: "", color: "" },
    carMaster: [],
    edit: false,
  };
  async componentDidMount() {
    this.fetchData();
    this.fetchData1();
  }
  async fetchData1(){
    let response = await http.get("/carMaster");
    let {data} = response;
    this.setState({carMaster:data});
  }
  
  async fetchData() {
    const { id } = this.props.match.params;
    if (id) {
      let response = await http.get(`/cars/${id}`);
      let { data } = response;
      console.log("if", data);
    
      this.setState({ car: data, edit: true });
      
    } else {
      let car = {
        id: "",
        price: "",
        kms: "",
        year: "",
        model: "",
        color: "",
      };
      this.setState({ car: car, edit: false });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.fetchData();
    }
  }
  handleChange = (e) => {
    const { currentTarget: input } = e;
    let s1 = { ...this.state };
    s1.car[input.name] = input.value;
    this.setState(s1);
  };
  async postData(url, obj) {
    let response = await http.post(url, obj);
    console.log(response);
    this.props.history.push("/cars");
  }
  async putData(url, obj) {
    let response = await http.put(url, obj);
    console.log(response);
    this.props.history.push("/cars");
  }
  handleSubmit = (e) => {
    e.preventDefault();
    let { car, edit } = this.state;
    edit ? this.putData(`/cars/${car.id}`, car) : this.postData("/cars", car);
  };
  render() {
    const { edit,carMaster } = this.state;
    let { model, id, price, kms, year, color } = this.state.car;
    let colorMaster = carMaster.find((car) => car.model === model)?.colors || [];
    console.log(colorMaster);
    return (
      <div className="container">
        <div className="form-group">
          <label>Car Id</label>
          <input
            type="text"
            className="form-control"
            id="id"
            name="id"
            onChange={this.handleChange}
            placeholder="Enter Name"
            readOnly={edit}
            value={id}
            style={{ backgroundColor: edit ? "whitesmoke" : "" }}
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="text"
            className="form-control"
            id="price"
            name="price"
            onChange={this.handleChange}
            placeholder="Enter Price"
            value={price}
          />
        </div>
        <div className="form-group">
          <label>Milage in kms</label>
          <input
            type="text"
            className="form-control"
            id="kms"
            name="kms"
            onChange={this.handleChange}
            placeholder="Enter Milage"
            value={kms}
          />
        </div>
        <div className="form-group">
          <label>Year of Manufacture</label>
          <input
            type="text"
            className="form-control"
            id="year"
            name="year"
            onChange={this.handleChange}
            placeholder="Enter Name"
            value={year}
          />
        </div>
        <div className="row">
          <div className="col-6">
            <div className="form-group">
              <label>Model</label>
              <select
                className="form-control"
                name="model"
                value={model}
                onChange={this.handleChange}
              >
                <option disabled value="">
                  Select a model
                </option>
                {carMaster.map((n) => (
                  <option key={n}>{n.model}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-6">
            <div className="form-group">
              <label>Color</label>
              <select
                className="form-control"
                name="color"
                value={color}
                onChange={this.handleChange}
              >
                <option disabled value="">
                  Select a color
                </option>
                {colorMaster.map((n,index) => (
                  <option key={index}>{n}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <button className="btn btn-primary" onClick={this.handleSubmit}>
          Submit
        </button>
      </div>
    );
  }
}
export default NewCar;
