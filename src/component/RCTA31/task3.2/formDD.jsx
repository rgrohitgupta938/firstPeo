import React, { Component } from "react";
import { Field, Formik, Form } from "formik";
class FormDD extends Component {
  state = {
    locs: [
      {
        country: "India",
        cities: ["New Delhi", "Mumbai", "Bangalore", "Chennai", "Pune"],
      },
      {
        country: "USA",
        cities: ["Los Angeles", "Chicago", "New York", "Seattle"],
      },
      { country: "France", cities: ["Paris", "Nice", "Lyon", "Cannes"] },
      { country: "Japan", cities: ["Tokyo", "Kyoto"] },
      { country: "China", cities: ["Shanghai", "Beijing", "Shenzen"] },
    ],
  };
  render() {
    const { locs } = this.state;
    return (
      <Formik initialValues={{ dd1: "", dd2: "" }}>
        {({ values }) => (
          <Form>
            <Field name="dd1" as="select" className="form-control">
              <option value="">Select Country</option>
              {locs.map((s1) => (
                <option value={s1.country} key={s1.country}>
                  {s1.country}
                </option>
              ))}
            </Field>
            <Field name="dd2" as="select" className="form-control">
              <option value="">Select City</option>
              {values.dd1 &&
                locs
                  .find((location) => location.country === values.dd1)
                  .cities.map((city, index) => (
                    <option key={index} value={city}>
                      {city}
                    </option>
                  ))}
            </Field>
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    );
  }
}
export default FormDD;
