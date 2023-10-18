import React, { Component } from "react";
import { Formik, Field, FieldArray, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  courseName: Yup.string()
    .min(3, "Course name must be at least 3 characters")
    .required("Course name is required"),
  students: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string()
          .min(4, "Student name must be at least 4 characters")
          .required("Student name is required"),
        quiz1: Yup.string()
          .required("Enter grade of Quiz 1")
          .max(1, "Quiz 1 grade must be an Single letter (A, B, C, or D)"),

        quiz2: Yup.string()
          .required("Enter grade of Quiz 2")
          .max(1, "Quiz 2s grade must be an Single letter (A, B, C, or D)"),
      })
    )
    .min(3, "At least 3 students should be in the course"),
});

class CourseForm extends Component {
  render() {
    const { index } = this.props.match.params;
    const { details } = this.props;
    const courseDetail = index >= 0 ? details[+index] : {};
    console.log(courseDetail);
    const grades = ["A", "B", "C", "D"];
    return (
      <div>
        <h1 className="text-center">Course Form</h1>
        <Formik
          initialValues={{
            courseName: courseDetail.courseName || "",
            students: courseDetail.students || [],
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log(values);
            this.props.onSubmit(values, index);
            this.props.history.push("/details");
          }}
        >
          {({ values, errors }) => (
            <Form>
              <div>
                <label htmlFor="courseName">Course Name:</label>
                <Field type="text" name="courseName" className="form-control" />
                <ErrorMessage
                  name="courseName"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div>
                <label>Students:</label>
                <FieldArray
                  name="students"
                  render={(arrayHelpers) => (
                    <div>
                      {values.students.map((student, index) => (
                        <div key={index} className="row mb-2">
                          <div className="col">
                            <div className="form-group">
                              <label htmlFor={`students[${index}].name`}>
                                Student Name
                              </label>
                              <Field
                                type="text"
                                name={`students[${index}].name`}
                                placeholder="Student Name"
                                className="form-control"
                              />
                              <div className="text-danger">
                                <ErrorMessage
                                  name={`students[${index}].name`}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col">
                            <div className="form-group">
                              <label htmlFor={`students[${index}].quiz1`}>
                                Quiz 1
                              </label>
                              <Field
                                type="text"
                                name={`students[${index}].quiz1`}
                                placeholder="Quiz 1"
                                className="form-control"
                              />
                              <div className="text-danger">
                                <ErrorMessage
                                  name={`students[${index}].quiz1`}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col">
                            <div className="form-group">
                              <label htmlFor={`students[${index}].quiz2`}>
                                Quiz 2
                              </label>
                              <Field
                                type="text"
                                name={`students[${index}].quiz2`}
                                placeholder="Quiz 2"
                                className="form-control"
                              />
                              <div className="text-danger">
                                <ErrorMessage
                                  name={`students[${index}].quiz2`}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="col align-self-center mt-2">
                            <button
                              className="btn btn-danger"
                              type="button"
                              onClick={() => arrayHelpers.remove(index)}
                            >
                              Remove Student
                            </button>
                          </div>
                        </div>
                      ))}
                      <button
                        className="btn btn-warning"
                        type="button"
                        onClick={() => arrayHelpers.push({})}
                      >
                        Add Student
                      </button>
                    </div>
                  )}
                />
              </div>
              <button className="btn btn-primary" type="submit">
                {index >= 0 ? "Edit" : "Submit"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

export default CourseForm;
