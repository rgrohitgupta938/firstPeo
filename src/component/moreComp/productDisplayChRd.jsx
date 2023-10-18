import React, { Component } from "react";

class ProductDisplayChRd extends Component {
  state = {
    products: [
      { id: "PEP110", name: "Pepsi", category: "Food", stock: "yes" },
      { id: "CLO876", name: "CloseUp", category: "Toothpaste", stock: "no" },
      { id: "PEA531", name: "Pears", category: "Soap", stock: "arriving" },
      { id: "LU7264", name: "Lux", category: "Soap", stock: "yes" },
      { id: "COL112", name: "Colgate", category: "Toothpaste", stock: "no" },
      { id: "DM881", name: "Dairy Milk", category: "Food", stock: "arriving" },
      { id: "LI130", name: "Liril", category: "Soap", stock: "yes" },
      { id: "PPS613", name: "Pepsodent", category: "Toothpaste", stock: "no" },
      { id: "MAG441", name: "Maggi", category: "Food", stock: "arriving" },
      { id: "PNT560", name: "Pantene", category: "Shampoo", stock: "no" },
      { id: "KK219", name: "KitKat", category: "Food", stock: "arriving" },
      { id: "DOV044", name: "Dove", category: "Soap", stock: "yes" },
    ],
    selValCat: [],
    selValSta: "All",
    st: 0,
  };

  handleChange = (e) => {
    const { name, value } = e.currentTarget;
    if (name === "selValCat") {
      const { selValCat } = this.state;
      const updatedSelValCat = [...selValCat];
      const index = updatedSelValCat.findIndex((k) => k === value);
      if (index === -1) {
        updatedSelValCat.push(value);
      } else {
        updatedSelValCat.splice(index, 1);
      }
      this.setState({ selValCat: updatedSelValCat });
    } else if (name === "selValSta") {
      this.setState({ selValSta: value, st: 1 });
    }
  };

  showProducts = () => {
    let { selValCat, products, selValSta, st } = this.state;
    let filteredProducts = [];
    if (selValCat.length === 0) return "";
    else if (st === 0) {
      filteredProducts = products.filter((prod) =>
        selValCat.find((l) => l === prod.category)
      );
    } else if (st === 1) {
      filteredProducts = products.filter((prod) =>
        selValCat.find((l) => l === prod.category)
      );
      filteredProducts = filteredProducts.filter((l) => l.stock === selValSta);
    }
    console.log(filteredProducts);
    return (
      <div>
        {filteredProducts.map((y) => (
          <React.Fragment key={y.id}>
            <div className="row">
              <div className="col-3">{y.name}</div>
              <div className="col-3">{y.category}</div>
              <div className="col-3">{y.id}</div>
              <div className="col-3">{y.stock}</div>
            </div>
          </React.Fragment>
        ))}
      </div>
    );
  };

  render() {
    const { selValCat, selValSta, products, st } = this.state;
    let product1 = products.map((n) => n.category);
    let pro2 = product1.filter((c, index) => {
      return product1.indexOf(c) === index;
    });
    let sta = products.map((n) => n.stock);
    let sta2 = sta.filter((c, index) => {
      return sta.indexOf(c) === index;
    });
    console.log(sta);
    return (
      <div className="conatiner">
        <div className="row">
          <div className="col-2 bg-light border p-4">
            <h5>Category</h5>
            {pro2.map((k) => (
              <div className="form-check" key={k}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="selValCat"
                  checked={selValCat.findIndex((tech) => tech === k) >= 0}
                  value={k}
                  onChange={this.handleChange}
                />
                <label className="form-check-label">{k}</label>
              </div>
            ))}
            <h5>Stock Status</h5>
            {sta2.map((k) => (
              <div className="form-check" key={k}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="selValSta"
                  checked={selValSta === k}
                  value={k}
                  onChange={this.handleChange}
                />
                <label className="form-check-label">{k}</label>
              </div>
            ))}
          </div>
          <div className="col-6 border p-2">
            Selected Products: {selValCat.join(",")}<br/>
            Stock Status : {selValSta}
            <br />
            {this.showProducts(st)}
          </div>
        </div>
      </div>
    );
  }
}

export default ProductDisplayChRd;
