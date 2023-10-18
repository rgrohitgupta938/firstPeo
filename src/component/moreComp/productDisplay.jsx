import React, { Component } from "react";
class ProductDisplay extends Component {
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
    const { checked, value, } = e.currentTarget;
    const { selVal } = this.state;
    let updatedSelVal = [...selVal];

    

    this.setState({ selVal: updatedSelVal });
  };
  showProducts = () => {
    let { selVal, products } = this.state;
    if (selVal.length === 0) return "";
    else {
      const filteredProducts = products.filter((prod) =>
        selVal.find((l) => l === prod.name)
      );
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
    return (
      <div className="conatiner">
        <div className="row">
          <div className="col-2 bg-light border p-4">
            {products.map((k) => (
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="selVal"
                  checked={selVal.findIndex((tech) => tech === k) >= 0}
                  value={k}
                  onChange={this.handleChange}
                />
                <label className="form-check-label">{k}</label>
              </div>
            ))}
          </div>
          <div className="col-6 border p-2">
            Selected Products : {selVal.join(",")}
            <br />
            {this.showProducts()}
          </div>
        </div>
      </div>
    );
  }
}
export default ProductDisplay;
