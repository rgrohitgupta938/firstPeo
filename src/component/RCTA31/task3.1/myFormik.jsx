import React, { Component } from "react";
import { Formik, Field, Form } from "formik";
class MyFormik extends Component {
  handleNumberChng = (e, values, handleChange) => {
    let { name, value } = e.target;
    switch (name) {
      case "num1":
        values.num2 = values.total - +value;
        break;
      case "num2":
        values.num1 = values.total - +value;
        break;
      case "total":
        values.num1 = +value / 2;
        values.num2 = +value / 2;
        break;
    }
    handleChange(e);
  };
  render() {
    console.log("hello");
    return (
      <Formik initialValues={{ num1: 0, num2: 0, total: 0 }}>
        {({ values, handleBlur, handleChange }) => (
          <Form>
            <Field
              name="num1"
              type="number"
              onChange={(e) => {
                this.handleNumberChng(e, values, handleChange);
              }}
            />
            <Field
              name="num2"
              type="number"
              onChange={(e) => {
                this.handleNumberChng(e, values, handleChange);
              }}
            />
            <Field
              name="total"
              type="number"
              onChange={(e) => {
                this.handleNumberChng(e, values, handleChange);
              }}
            />
          </Form>
        )}
      </Formik>
    );
  }
}
export default MyFormik;
