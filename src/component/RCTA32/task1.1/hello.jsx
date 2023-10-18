import React from "react";

function Hello(props) {
  console.log(props);
  return (
    <h4>
      Hello {props.name}. Welcome to the course on op {props.course}
    </h4>
  );
}
export default Hello;
