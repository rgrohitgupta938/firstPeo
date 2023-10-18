import React, { Component } from "react";
class Favorites extends Component {
  render() {
    const { favorites ,onDelete } = this.props;
    return (
        <React.Fragment>
        <h3>My Favorites</h3>
        {favorites.map((fav, index) => (
          <img
            key={index}
            src={fav}
            alt={`Favorite Image ${index}`}
            onClick={() => onDelete(index)}
            style={{ width: "40px" }}
            className="thumbnail m-3"
          />
        ))}
      </React.Fragment>
    );
  }
}
export default Favorites;
