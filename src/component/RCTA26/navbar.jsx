import React, { Component } from "react";
import { Link } from "react-router-dom";
class NavBar extends Component {
  render() {
    const { user } = this.props;
    console.log(user);
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-success">
        <Link
          className="navbar-brand ps-2 text-dark"
          to={
            user
              ? user.role === "admin"
                ? "/admin"
                : user.role === "student"
                ? "student"
                : user.role === "faculty"
                ? "faculty"
                : "/login"
              : "/login"
          }
        >
          <strong>
            {user
              ? user.role === "admin"
                ? "Home"
                : user.role === "student"
                ? "Student Home"
                : user.role === "faculty"
                ? "Faculty Home"
                : "Home"
              : "Home"}
          </strong>
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto">
            {user && user.role === "faculty" && (
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/coursesAssigned">
                  Courses
                </Link>
              </li>
            )}
            {user && user.role === "faculty" ? (
              <li className="nav-item dropdown">
                <Link
                  className="nav-link text-dark dropdown-toggle"
                  to="/admin"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Class Details
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/scheduleClass">
                      Schedule a class
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/scheduledClasses">
                      All Scheduled Classes
                    </Link>
                  </li>
                </ul>
              </li>
            ) : (
              ""
            )}
            {user && user.role === "student" && (
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/studentDetails">
                  Student Details
                </Link>
              </li>
            )}
            {user && user.role === "student" && (
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/allClasses">
                  All Classes
                </Link>
              </li>
            )}
            {user && user.role === "student" && (
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/studentCourse">
                  All Course
                </Link>
              </li>
            )}
            {user && user.role === "admin" && (
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/register">
                  Register
                </Link>
              </li>
            )}
            {user && user.role === "admin" ? (
              <li className="nav-item dropdown">
                <Link
                  className="nav-link text-dark dropdown-toggle"
                  to="/admin"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Assign
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/addStudentCourse">
                      Student to Course
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/facultyCourse">
                      Faculty to Course
                    </Link>
                  </li>
                </ul>
              </li>
            ) : (
              ""
            )}
            {user && user.role === "admin" ? (
              <li className="nav-item dropdown">
                <Link
                  className="nav-link text-dark dropdown-toggle"
                  to="/emp"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  View
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/allStudents?page=1">
                      All Students
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/allFaculty?page=1">
                      All Faculties
                    </Link>
                  </li>
                </ul>
              </li>
            ) : (
              ""
            )}
          </ul>
          <ul className="navbar-nav">
            {!user && (
              <li>
                <Link className="nav-link text-dark" to="/login">
                  Login
                </Link>
              </li>
            )}
            {user && (
              <li className="nav-link text-dark">Welcome {user.name}</li>
            )}
            {user && (
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/logout">
                  Logout
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
