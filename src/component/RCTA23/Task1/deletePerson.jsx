import React, { Component } from "react";
import http from "../../RCTA24/Task5/httpService";
class DeletePerson extends Component {
   componentDidMount() {
    const { id ="" } = this.props.match.params;
    let response = id !=="" ?  http.deleteApi(`/personApp/persons/${id}`) :  null ;
    console.log("hiiiiii00");
    this.props.history.push("/persons");
  }
  render() {
    return "";
  }
}
export default DeletePerson;
