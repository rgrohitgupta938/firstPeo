import React from "react";

function Lecture(props) {
  let lecs = props.lectures;
  return (
    <div>
      {lecs.map((l1) => (
        <h5>
          {l1.name} = {l1.likes}
          <button
            className="btn btn-primary ms-1 btn-sm"
            onClick={() => props.clickLike(l1.name)}
          >
            Like
          </button>
        </h5>
      ))}
    </div>
  );
}
export default Lecture;
