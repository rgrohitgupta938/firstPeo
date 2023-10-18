import React, { Component } from "react";
class ProductDisplayCat extends Component {
  state = {
    products: [
      { id: "PEP110", name: "Pepsi", category: "Food", stock: true },
      { id: "CLO876", name: "Close Up", category: "Toothpaste", stock: false },
      { id: "PEA531", name: "Pears", category: "Soap", stock: true },
      { id: "LU7264", name: "Lux", category: "Soap", stock: false },
      { id: "COL112", name: "Colgate", category: "Toothpaste", stock: true },
      { id: "DM881", name: "Dairy Milk", category: "Food", stock: false },
      { id: "LI130", name: "Liril", category: "Soap", stock: true },
      { id: "PPS613", name: "Pepsodent", category: "Toothpaste", stock: false },
      { id: "MAG441", name: "Maggi", category: "Food", stock: true },
    ],
    selVal: "",
  };

  handleChange = (e) => {
    const { value } = e.currentTarget;
    console.log(e.currentTarget,value);
    this.setState({ selVal: value });
  };
  showProducts = () => {
    let { selVal, products } = this.state;
    if (selVal.length === 0) return "";
    else {
      const filteredProducts = products.filter((prod) =>
        selVal === prod.category);
      console.log(filteredProducts);
      return (
        <div>
          {filteredProducts.map((y) => (
            <React.Fragment>
              <div className="row">
                <div className="col-3">{y.name}</div>
                <div className="col-3">{y.category}</div>
                <div className="col-3">{y.id}</div>
                <div className="col-3">{y.stock ? "True" : "False"}</div>
              </div>
            </React.Fragment>
          ))}
        </div>
      );
    }
  };

  render() {
    const { selVal, products } = this.state;
    let product1  = products.map((n) => n.category);
    let pro2= product1.filter((c,index) => {
        return product1.indexOf(c) === index;
    });
    console.log(pro2);
    return (
      <div className="conatiner">
        <div className="row">
          <div className="col-2 bg-light border p-4">
            {pro2.map((k) => (
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="selVal"
                  checked={selVal === k}
                  value={k}
                  onChange={this.handleChange}
                />
                <label className="form-check-label">{k}</label>
              </div>
            ))}
          </div>
          <div className="col-6 border p-2">
            Selected Products : {selVal}
            <br />
            {this.showProducts()}
          </div>
        </div>
      </div>
    );
  }
}
export default ProductDisplayCat;
