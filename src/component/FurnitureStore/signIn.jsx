import React, { Component } from "react";
import http from "../../services/httpService";
import auth from "../../services/authService";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as yup from "yup";
const validateLogin = () =>
  yup.object().shape({
    email: yup.string().email().required("Enter Email"),
    password: yup.string().required("Enter password"),
  });
class signIn extends Component {
  state = {
    errors: {},
  };
  async login(url, obj) {
    try {
      await validateLogin().validate(obj);
      console.log("login", obj, url);
      let response = await http.post(url, obj);
      let { data } = response;
      console.log("insode lofn", obj, response);
      auth.login(data);
      window.location = "/products";
    } catch (ex) {
      alert("Invalid Email Id/password");
    }
  }
  handleSubmit = (values) => {
    console.log("hello", values);
    this.login("/login", values);
  };
  render() {
    let { errors } = this.state;
    return (
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={this.handleSubmit}
      >
        {({ values, handleChange }) => (
          <Form>
            <div className="form-group">
              <label>Email</label>
              <Field name="email" type="text" className="form-control" />
              <div className="text-danger">
                <ErrorMessage name="email" />
              </div>
            </div>
            <div className="form-group">
              <label>Password</label>
              <Field name="password" type="password" className="form-control" />
              <div className="text-danger">
                <ErrorMessage name="password" />
              </div>
            </div>
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    );
  }
}
export default signIn;
