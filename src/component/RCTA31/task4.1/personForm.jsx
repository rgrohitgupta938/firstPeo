import React, { Component } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";

const personValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(6, "Name should have minimum 6 characters"),
  age: yup
    .number()
    .typeError("Age should be a number")
    .required("Age is required")
    .min(0, "Age cannot be less than 0")
    .max(100, "Age cannot be greater than 100"),
  country: yup.string().required("Country is required"),
  tech: yup.array().min(1, "Choose at least 1 technology"),
  currentStatus: yup.string().required("Status is required"),
});

class PersonForm extends Component {
  state = {
    countries: ["USA", "France", "Canada", "India", "England"],
    technologies: ["Javascript", "React", "Angular", "Node.js"],
    currentStatuses: ["Student", "Working", "Looking for a job"],
  };
  render() {
    const { persons } = this.props;
    const { index } = this.props.match.params;
    let person = index ? persons[+index] : {};
    console.log("Hello");
    const { countries, technologies, currentStatuses } = this.state;
    let countries1 = countries.map((c1) => ({ value: c1, display: c1 }));
    countries1.unshift({
      value: "",
      display: "Select the Country",
    });
    return (
      <Formik
        initialValues={{
          name: person.name || "",
          age: person.age || "",
          country: person.country || "",
          tech: person.tech || [],
          currentStatus: person.currentStatus || "",
        }}
        validationSchema={personValidationSchema}
        onSubmit={(values) => {
          this.props.onSubmit(values, index);
          this.props.history.push("/");
        }}
      >
        {() => (
          <Form>
            <h4>Deatils of the person</h4>
            <div className="form-group">
              <label>Name</label>
              <Field name="name" type="text" className="form-control" />
              <div className="text-danger">
                <ErrorMessage name="name" />
              </div>
            </div>
            <div className="form-group">
              <label>Age</label>
              <Field name="age" type="text" className="form-control" />
              <div className="text-danger">
                <ErrorMessage name="age" />
              </div>
            </div>
            <div className="form-group">
              <label>Country</label>
              <Field name="country" as="select" className="form-control">
                {countries1.map((s1) => (
                  <option value={s1.value} key={s1.display}>
                    {s1.display}
                  </option>
                ))}
              </Field>
              <div className="text-danger">
                <ErrorMessage name="country" />
              </div>
            </div>
            <div className="form-group">
              <label className="m-0 pe-3">Technologies Known</label>
              {technologies.map((t1) => (
                <div className="form-check form-check-inline" key={t1}>
                  <Field
                    name="tech"
                    type="checkbox"
                    value={t1}
                    className="form-control-input"
                  ></Field>
                  <label className="form-check-label">{t1}</label>
                </div>
              ))}
              <div className="text-danger">
                <ErrorMessage name="tech" />
              </div>
            </div>
            <div className="form-group">
              <label className="m-0 pe-3">Current Status</label>
              {currentStatuses.map((t1) => (
                <div className="form-check form-check-inline" key={t1}>
                  <Field
                    name="currentStatus"
                    type="radio"
                    value={t1}
                    className="form-control-input"
                  ></Field>
                  <label className="form-check-label">{t1}</label>
                </div>
              ))}
              <div className="text-danger">
                <ErrorMessage name="currentStatus" />
              </div>
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary me-2">
                {index ? "Update Details" : "Add"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    );
  }
}
export default PersonForm;
