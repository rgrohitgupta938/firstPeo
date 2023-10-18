import React, { Component } from "react";
class SetComp extends Component {
  state = {
    secA: [
      { roll: 1, sec: "A", name: "Jack", maths: 67, eng: 71, comp: 61 },
      { roll: 2, sec: "A", name: "Mary", maths: 79, eng: 74, comp: 51 },
      { roll: 3, sec: "A", name: "Steve", maths: 61, eng: 78, comp: 46 },
      { roll: 4, sec: "A", name: "Bob", maths: 75, eng: 67, comp: 68 },
      { roll: 5, sec: "A", name: "Kathy", maths: 70, eng: 63, comp: 74 },
      { roll: 6, sec: "A", name: "Meg", maths: 46, eng: 61, comp: 63 },
      { roll: 7, sec: "A", name: "Tom", maths: 72, eng: 85, comp: 65 },
      { roll: 8, sec: "A", name: "David", maths: 85, eng: 71, comp: 85 },
    ],
    secB: [
      { roll: 1, sec: "B", name: "Arthur", maths: 67, eng: 55, comp: 78 },
      { roll: 2, sec: "B", name: "Kevin", maths: 69, eng: 64, comp: 68 },
      { roll: 3, sec: "B", name: "Harry", maths: 61, eng: 88, comp: 80 },
      { roll: 4, sec: "B", name: "Martin", maths: 65, eng: 60, comp: 48 },
      { roll: 5, sec: "B", name: "Pam", maths: 80, eng: 53, comp: 54 },
      { roll: 6, sec: "B", name: "Nicky", maths: 76, eng: 71, comp: 83 },
      { roll: 7, sec: "B", name: "Robert", maths: 82, eng: 65, comp: 75 },
      { roll: 8, sec: "B", name: "Susan", maths: 65, eng: 81, comp: 50 },
    ],
    click: -1,
    text: "",
    data : [],
  };

  showSecATotal = () => {
    let s1 = { ...this.state };
    let pr = s1.secA.map((n) => {
      return { ...n, total: n.comp + n.maths + n.eng };
    });
    s1.click = 0;
    s1.data = pr.sort((p1,p2) => p2.total - p1.total);
    s1.text = "Performance Report for Seaction A - Sorted by Total";
    console.log(pr);
    console.log("click", s1.click);
    this.setState(s1);
  };
  showSecBTotal = () => {
    let s1 = { ...this.state };
    let pr = s1.secB.map((n) => {
      return { ...n, total: n.comp + n.maths + n.eng };
    });
    s1.click = 0;
    s1.data = pr.sort((p1,p2) => p2.total - p1.total);
    s1.text = "Performance Report for Seaction B - Sorted by Total";
    console.log(pr);
    console.log("click", s1.click);
    this.setState(s1);
  };
  showAllSecTotal = () => {
    let s1 = { ...this.state };
    let pr = [...s1.secA,...s1.secB];
    console.log(pr);
    pr = pr.map((n) => {
      return { ...n, total: n.comp + n.maths + n.eng };
    });
    s1.click = 0;
    s1.data = pr.sort((p1,p2) => p2.total - p1.total);
    s1.text = "Performance Report for All Seaction - Sorted by Total";
    console.log(pr);
    console.log("click", s1.click);
    this.setState(s1);
  };
  showSecASortByName = () => {
    let s1 = { ...this.state };
    let pr = s1.secA.map((n) => {
      return { ...n, total: n.comp + n.maths + n.eng };
    });
    s1.click = 0;
    s1.data = pr.sort((p1,p2) => p1.name.localeCompare(p2.name));
    s1.text = "Performance Report for Seaction A - Sorted by Name";
    console.log(pr);
    console.log("click", s1.click);
    this.setState(s1);
  };
  showSecBSortByName = () => {
    let s1 = { ...this.state };
    let pr = s1.secB.map((n) => {
      return { ...n, total: n.comp + n.maths + n.eng };
    });
    s1.click = 0;
    s1.data = pr.sort((p1,p2) => p1.name.localeCompare(p2.name));
    s1.text = "Performance Report for Seaction B - Sorted by Name";
    console.log(pr);
    console.log("click", s1.click);
    this.setState(s1);
  };
  showAllSecName = () => {
    let s1 = { ...this.state };
    let pr = [...s1.secA,...s1.secB];
    console.log(pr);
    pr = pr.map((n) => {
      return { ...n, total: n.comp + n.maths + n.eng };
    });
    s1.click = 0;
    s1.data = pr.sort((p1,p2) => p1.name.localeCompare(p2.name));
    s1.text = "Performance Report for All Seaction - Sorted by Name";
    console.log(pr);
    console.log("click", s1.click);
    this.setState(s1);
  };

  render() {
    const { seaA, secB, click, text,data } = this.state;
    return (
      <div className="container text-center">
        <button
          className="btn btn-primary m-4"
          onClick={() => this.showSecATotal()}
        >
          SecA by Total
        </button>
        <button
          className="btn btn-primary m-4"
          onClick={() => this.showSecBTotal()}
        >
          SecB by Total
        </button>
        <button
          className="btn btn-primary m-4"
          onClick={() => this.showAllSecTotal()}
        >
          All Sec by Total
        </button>
        <button
          className="btn btn-primary m-4"
          onClick={() => this.showSecASortByName()}
        >
          SecA by Name
        </button>
        <button
          className="btn btn-primary m-4"
          onClick={() => this.showSecBSortByName()}
        >
          SecB by Name
        </button>
        <button
          className="btn btn-primary m-4"
          onClick={() => this.showAllSecName()}
        >
          All Sec by Name
        </button>
        <br />
        {!(click === 0) ? (
        ""
      ) : (
        <React.Fragment>
          <h4 className="text-center">{text}</h4>
          <div className="row bg-dark text-white border">
                <div className="col-1 border">RollNo</div>
                <div className="col-1 border">Section</div>
                <div className="col-2 border">Name</div>
                <div className="col-2 border">Maths</div>
                <div className="col-2 border">English</div>
                <div className="col-2 border">Computer</div>
                <div className="col-2 border">Total</div>
              </div>
          {data.map((k) => {
            let { name, roll, sec, maths, comp, eng, total } = k;
            return (
              <div className="row border">
                <div className="col-1 border">{roll}</div>
                <div className="col-1 border">{sec}</div>
                <div className="col-2 border">{name}</div>
                <div className="col-2 border">{maths}</div>
                <div className="col-2 border">{eng}</div>
                <div className="col-2 border">{comp}</div>
                <div className="col-2 border">{total}</div>
              </div>
            );
          })}
        </React.Fragment>
      )}
      </div>
    );
  }
}
export default SetComp;
