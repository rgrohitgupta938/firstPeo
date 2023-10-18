import React, { Component } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";

const deliveryvalidationSchema = yup.object().shape({
  name: yup.string().required("Name is required").min(5),
  gender: yup.string().required("Gender is required"),
  delivery: yup.string().required("Delivery Option is required"),
  payments: yup
    .array()
    .required("Payment is required")
    .min(1, "Choose atleast 1 Payment Option")
    .max(2, "Choose atmost 2 Payment Option"),
  slot: yup.string().required("Select a delivery slot"),
});

class DisplayForm extends Component {
  state = {
    genders: ["Male", "Female"],
    deliveryOpt: ["Home", "Office", "Pichup"],
    payOpt: ["CreditCard", "DebitCard", "NetBanking"],
    deliverySlot: ["2PM-6PM", "Before 10AM"],
  };
  render() {
    const { deliveries } = this.props;
    const { index } = this.props.match.params;
    let delivery = index ? deliveries[+index] : {};
    console.log("Hello");
    const { genders, payOpt, deliveryOpt, deliverySlot } = this.state;
    let deliverySlot1 = deliverySlot.map((c1) => ({ value: c1, display: c1 }));
    deliverySlot1.unshift({
      value: "",
      display: "Select Delivery Slot",
    });
    return (
      <Formik
        initialValues={{
          name: delivery.name || "",
          gender: delivery.gender || "",
          payments: delivery.payments || [],
          slot: delivery.slot || "",
          delivery: delivery.delivery || "",
        }}
        validationSchema={deliveryvalidationSchema}
        onSubmit={(values) => {
          this.props.onSubmit(values, index);
          this.props.history.push("/deliveryDetails");
        }}
      >
        {() => (
          <Form>
            <div className="form-group">
              <label>Name</label>
              <Field name="name" type="text" className="form-control" />
              <div className="text-danger">
                <ErrorMessage name="name" />
              </div>
            </div>
            <div className="form-group">
              {genders.map((t1) => (
                <div className="form-check form-check-inline" key={t1}>
                  <Field
                    name="gender"
                    type="radio"
                    value={t1}
                    className="form-control-input"
                  ></Field>
                  <label className="form-check-label">{t1}</label>
                </div>
              ))}
              <div className="text-danger">
                <ErrorMessage name="gender" />
              </div>
            </div>
            <div className="form-group">
              <label className="m-0 pe-3 fw-bold">
                Choose your delivery Option
              </label>
              {deliveryOpt.map((t1) => (
                <div className="form-check" key={t1}>
                  <Field
                    name="delivery"
                    type="radio"
                    value={t1}
                    className="form-control-input"
                  ></Field>
                  <label className="form-check-label form-check-inline">
                    {t1}
                  </label>
                </div>
              ))}
              <div className="text-danger">
                <ErrorMessage name="delivery" />
              </div>
            </div>
            <div className="form-group">
              <label className="m-0 pe-3 fw-bold">
                Choose your Payment Options
              </label>
              {payOpt.map((t1) => (
                <div className="form-check" key={t1}>
                  <Field
                    name="payments"
                    type="checkbox"
                    value={t1}
                    className="form-control-input"
                  ></Field>
                  <label className="form-check-label">{t1}</label>
                </div>
              ))}
              <div className="text-danger">
                <ErrorMessage name="payments" />
              </div>
            </div>
            <div className="form-group">
              <label></label>
              <Field name="slot" as="select" className="form-control">
                {deliverySlot1.map((s1) => (
                  <option value={s1.value} key={s1.display}>
                    {s1.display}
                  </option>
                ))}
              </Field>
              <div className="text-danger">
                <ErrorMessage name="slot" />
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
export default DisplayForm;
