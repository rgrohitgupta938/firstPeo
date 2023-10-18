import React, { Component } from "react";
import { Formik, Field, Form, FieldArray, ErrorMessage } from "formik";
import * as yup from "yup";

const listValidationSchema = yup.object().shape({
  name: yup.string().required("Name of the shopping list is required "),
  items: yup
    .array()
    .of(
      yup.object().shape({
        item: yup
          .string()
          .required("Product name is mandatory")
          .min(3, "Product name is too short"),
        qty: yup
          .number("Quantity must be integer")
          .required("Quantity is required")
          .integer("Quantity must be integer")
          .min(1, "Quantity must be greater than 1"),
      })
    )
    .required("Items are required in the shopping list")
    .min(2, "Minimum of 2 items should be in the shooping list"),
});

class ShoppingForm extends Component {
  render() {
    const { lists } = this.props;
    const { index } = this.props.match.params;
    let list = index ? lists[+index] : {};
    return (
      <Formik
        initialValues={{ name: list.name || "", items: list.items || [] }}
        validationSchema={listValidationSchema}
        onSubmit={(values) => {
          this.props.onSubmit(values, index);
          this.props.history.push("/");
        }}
      >
        {({ values, errors }) => (
          <Form>
            {console.log("Erros :", errors)}
            <h4>Details of shopping List</h4>
            <div className="form-group">
              <label>Name</label>
              <Field
                name="name"
                type="text"
                placeholder="Name of the shopping list"
                className="form-control"
              />
              <div className="text-danger">
                <ErrorMessage name="name" />
              </div>
            </div>
            <FieldArray
              name="items"
              render={(arrayHelpers) => (
                <div>
                  {values.items.map((item, index) => (
                    <div className="row mb-2" key={index}>
                      <div className="col-2">
                        <Field
                          name={`items[${index}].item`}
                          type="text"
                          placeholder="Product Name"
                          className="form-control"
                        />
                      </div>
                      <div className="col-2">
                        <Field
                          name={`items[${index}].qty`}
                          type="text"
                          placeholder="Enter Quantity"
                          className="form-control"
                        />
                      </div>
                      <div className="col-2 align-middle">
                        <button
                          type="button"
                          className="btn btn-sm btn-warning mr-2"
                          onClick={() => arrayHelpers.remove(index)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="btn btn-success mb-2"
                    onClick={() => arrayHelpers.push("")}
                  >
                    Add item to shopping List
                  </button>
                  <div className="text-danger">
                    {typeof errors.items === "string"
                      ? errors.items
                      : errors.items
                      ? errors.items.reduce(
                          (acc, curr) =>
                            acc ? acc : curr ? curr.item || curr.qty : acc,
                          ""
                        )
                      : ""}
                  </div>
                </div>
              )}
            />
            <div className="form-group">
              <button type="submit" className="btn btn-primary mr-2">
                {index ? "Update" : "Add"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    );
  }
}
export default ShoppingForm;
