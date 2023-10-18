import React, { Component } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
const personValidate = (values) => {
  const errors = {};
  if (!values.name) errors.name = "Name is required";
  else if (values.name.length < 5)
    errors.name = "Name should have minimum 6 characters";
  if (!values.age) errors.age = "Age is required";
  else if (isNaN(+values.age)) errors.age = "Age should be a number";
  else if (+values.age < 0) errors.age = "Age cannot be less than 0";
  else if (+values.age > 100) errors.age = "Age cannot be greater than 100";
  if (!values.country) errors.country = "Country is required";
  if (values.tech.length === 0) errors.tech = "Choose atleast 1 Teachnology";
  if (!values.currentStatus) errors.currentStatus = "Status is required";
  return errors;
};
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
        validate={personValidate}
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
