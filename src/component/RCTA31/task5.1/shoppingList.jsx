import React, { Component } from "react";
class ShoppingList extends Component {
  editList = (index) => {
    this.props.history.push(`/shoppingList/${index}/edit`);
  };
  addList = (index) => {
    this.props.history.push(`/shoppingList/add`);
  };
  render() {
    const { lists } = this.props;
    return (
      <React.Fragment>
        <h4>Details of ShoppingList</h4>
        {lists.map((l1, index) => (
          <div className="row" key={index}>
            <div className="col-2 border">{l1.name}</div>
            <div className="col-8 border">
              {l1.items.map((x) => `${x.item}-${x.qty}`).join(",")}
            </div>
            <div className="col-2 border">
              <button
                className="btn btn-warning btn-sm"
                onClick={() => this.editList(index)}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
        <button className="btn btn-primary mr-3" onClick={() => this.addList()}>
          Add New Shopping List
        </button>
      </React.Fragment>
    );
  }
}
export default ShoppingList;
