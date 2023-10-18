import React, { Component } from "react";
class PicViewer extends Component {

    

  render() {
    const { pics, currentIndex,onAddFavorites } = this.props;
    return (
      <React.Fragment>
        <div className="col-12 border text-center" bg-light>
          <img
            src={pics[currentIndex]}
            className="mx-auto d-block ps-1 pe-1 pb-2"
          ></img>
          <button
            className="btn btn-primary btn-lg m-2"
            onClick={() => onAddFavorites(currentIndex)}
          >
            Add to Favorites
          </button>
        </div>
      </React.Fragment>
    );
  }
}
export default PicViewer;
