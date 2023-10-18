import React, { Component } from "react";
import { Link } from "react-router-dom";
class CoursePage extends Component{

    render(){
        const {courseName} = this.props.match.params;
        const {lectures} = this.props;
        let lectures1 = lectures.filter((lect) => lect.course === courseName);
        return(
            <React.Fragment>
                <h4>Course Name : {courseName}</h4>
                <h4>List of lectures</h4>
                <ul>
                    {lectures1.map((lect) => (
                        <li>
                            <Link to={`/lecture/${courseName}/${lect.id}`}>Lecture Id : {lect.id} - {lect.topic}</Link>
                            </li>
                    ))
                    }
                </ul>
            </React.Fragment>
        );
    }

}
export default CoursePage;