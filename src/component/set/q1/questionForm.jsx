import { Field, Form, Formik } from "formik";
import React, { Component } from "react";
class QuestionForm extends Component {
  render() {
    let question = this.props.question
      ? this.props.question.length === 0
        ? {}
        : this.props.question
      : {};
    console.log(question);
    return (
      <Formik
        initialValues={{
          qnText: question.qnText || "",
          A: question.A || "",
          B: question.B || "",
          C: question.C || "",
          D: question.D || "",
          ans: question.ans || "",
        }}
        onSubmit={(values) => {
          console.log(values);
          this.props.onSubmit(values, this.props.editIndex);
        }}
      >
        {() => (
          <Form>
            <div className="form-group">
              <label>Question</label>
              <Field name="qnText" type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label>Option A</label>
              <Field name="A" type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label>Option B</label>
              <Field name="B" type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label>Option C</label>
              <Field name="C" type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label>Option D</label>
              <Field name="D" type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label>Correct Answer</label>
              <Field name="ans" type="text" className="form-control" />
            </div>
            <div className="form-group">
              <button className="btn btn-primary" type="submit">
                {this.props.question
                  ? this.props.question.length !== 0
                    ? "Edit"
                    : "Submit"
                  : "Submit"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    );
  }
}
export default QuestionForm;
