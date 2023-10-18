import { Formik, Field, Form } from "formik";
import React, { Component } from "react";
class PaperForm extends Component {
  state = {};
  render() {
    const { questions } = this.props;
    return (
      <Formik
        initialValues={{ name: "", questions: [] }}
        onSubmit={(values) => {
          console.log(values);
          this.props.onSubmit(values);
        }}
      >
        {({ values, handleChange }) => (
          <Form>
            <div className="form-group">
              <label>Name Of the Question Paper</label>
              <Field name="name" type="text" className="form-control" />
            </div>
            <div className="form-group">
              {questions.map((t1) => (
                <div className="form-check" key={t1}>
                  <Field
                    name="questions"
                    type="checkbox"
                    value={t1.qnText}
                    className="form-control-input"
                  ></Field>
                  <label className="form-check-label">
                    {t1.id}. {t1.qnText}
                  </label>
                </div>
              ))}
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
export default PaperForm;
