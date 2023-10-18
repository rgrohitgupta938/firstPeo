import React,{Component} from "react";
import http from "./httpService";
class DeleteStudent extends Component{
     componentDidMount() {
        const { id ="" } = this.props.match.params;
        console.log(id);
        let response =  id !== "" ?  http.deleteApi(`/svr/students/${id}`) : "";
        console.log("hiiiiii00");
        this.props.history.push("/students");
      }
      render() {
        return "";
      }
}
export default DeleteStudent;