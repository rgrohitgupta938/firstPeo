import React, { Component } from "react";
import NavBar from "./navbar";
import { Redirect, Route, Switch } from "react-router-dom";
import Login from "./login";
import Logout from "./logout";
import Admin from "./admin";
import auth from "../../services/authService";
import Register from "./register";
import AllStudents from "./allStudents";
import AllFaculty from "./allFaculty";
import AddStudentToCourse from "./addStudentToCourse";
import AddFacultyToCourse from "./addFacultyToCourse";
import Student from "./student";
import CourseStudent from "./courseStudent";
import AllClasses from "./allClasses";
import StudentDetails from "./studentDetails";
import Faculty from "./faculty";
import CoursesAssigned from "./coursesAssigned";
import ScheduledClasses from "./scheduledClasses";
import ScheduleClass from "./scheduleClass";
import NotAllowed from "./notAllowed";
class PortalMainComp extends Component {
  render() {
    const user = auth.getUser();
    return (
      <React.Fragment>
        <NavBar user={user} />
        <div className="container">
          <Switch>
            <Route
              path="/login"
              render={(props) =>
                user ? (
                  user.role === "faculty" ? (
                    <Redirect to="/faculty" />
                  ) : user.role === "student" ? (
                    <Redirect to="/student" />
                  ) : user.role === "admin" ? (
                    <Redirect to="/admin" />
                  ) : (
                    <Redirect to="/notAllowed" />
                  )
                ) : (
                  <Login {...props} />
                )
              }
            />
            <Route
              path="/faculty"
              render={(props) =>
                user ? (
                  user.role === "faculty" ? (
                    <Faculty {...props} />
                  ) : (
                    <Redirect to="/notAllowed" />
                  )
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              path="/scheduleClass"
              render={(props) =>
                user ? (
                  user.role === "faculty" ? (
                    <ScheduleClass {...props} />
                  ) : (
                    <Redirect to="/notAllowed" />
                  )
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              path="/scheduledClasses"
              render={(props) =>
                user ? (
                  user.role === "faculty" ? (
                    <ScheduledClasses {...props} />
                  ) : (
                    <Redirect to="/notAllowed" />
                  )
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              path="/coursesAssigned"
              render={(props) =>
                user ? (
                  user.role === "faculty" ? (
                    <CoursesAssigned {...props} />
                  ) : (
                    <Redirect to="/notAllowed" />
                  )
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              path="/student"
              render={(props) =>
                user ? (
                  user.role === "student" ? (
                    <Student {...props} />
                  ) : (
                    <Redirect to="/notAllowed" />
                  )
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              path="/studentCourse"
              render={(props) =>
                user ? (
                  user.role === "student" ? (
                    <CourseStudent {...props} />
                  ) : (
                    <Redirect to="/notAllowed" />
                  )
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              path="/allClasses"
              render={(props) =>
                user ? (
                  user.role === "student" ? (
                    <AllClasses {...props} />
                  ) : (
                    <Redirect to="/notAllowed" />
                  )
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              path="/studentDetails"
              render={(props) =>
                user ? (
                  user.role === "student" ? (
                    <StudentDetails {...props} />
                  ) : (
                    <Redirect to="/notAllowed" />
                  )
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              path="/admin"
              render={(props) =>
                user ? (
                  user.role === "admin" ? (
                    <Admin {...props} />
                  ) : (
                    <Redirect to="/notAllowed" />
                  )
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              path="/facultyCourse"
              render={(props) =>
                user ? (
                  user.role === "admin" ? (
                    <AddFacultyToCourse {...props} />
                  ) : (
                    <Redirect to="/notAllowed" />
                  )
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              path="/addStudentCourse"
              render={(props) =>
                user ? (
                  user.role === "admin" ? (
                    <AddStudentToCourse {...props} />
                  ) : (
                    <Redirect to="/notAllowed" />
                  )
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              path="/allStudents"
              render={(props) =>
                user ? (
                  user.role === "admin" ? (
                    <AllStudents {...props} />
                  ) : (
                    <Redirect to="/notAllowed" />
                  )
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              path="/allFaculty"
              render={(props) =>
                user ? (
                  user.role === "admin" ? (
                    <AllFaculty {...props} />
                  ) : (
                    <Redirect to="/notAllowed" />
                  )
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              path="/register"
              render={(props) =>
                user ? (
                  user.role === "admin" ? (
                    <Register {...props} />
                  ) : (
                    <Redirect to="/notAllowed" />
                  )
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              path="/logout"
              render={(props) =>
                user ? <Logout {...props} /> : <Redirect to="/login" />
              }
            />
            <Route path="/notAllowed" component={NotAllowed} />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}
export default PortalMainComp;
