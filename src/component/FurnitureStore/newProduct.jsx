import React, { Component } from "react";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import http from "../../services/httpService";
import "./main.css";
import * as yup from "yup";
const validateProductForm = () =>
  yup.object().shape({
    prodCode: yup.string().required("Product code is required"),
    img: yup.string().url().required("Image URL is required"),
    category: yup.string().required("Category is required"),
    title: yup.string().required("This field is required"),
  });
class NewProduct extends Component {
  state = {
    categoryArr: [],
    product: {
      prodCode: "",
      img: "",
      title: "",
      ingredients: [],
      category: "",
      desc: [],
    },
  };

  async componentDidMount() {
    const { prodCode } = this.props.match.params;
    await this.fetchProduct(prodCode);
    await this.fetchCategories();
  }

  async fetchProduct(prodCode) {
    try {
      const response = await http.get(`/product/${prodCode}`);
      const { data } = response;
      console.log(typeof data);
      this.setState({ product: data });
    } catch (error) {
      console.log(error);
    }
  }
  async fetchCategories() {
    try {
      const response = await http.get("/category");
      this.setState({ categoryArr: response.data });
    } catch (error) {
      console.log(error);
    }
  }
  handleAdd = async (obj) => {
    try {
      await validateProductForm().validate(obj, { abortEarly: false });
      if (this.props.match.params.prodCode) {
        console.log(this.props.match.params.prodCode);
        let response = await http.put(
          `/newproduct/${this.props.match.params.prodCode}`,
          obj
        );
      } else {
        const response = await http.post("/newproduct", obj);
      }
    } catch (error) {
      this.showAlert("Ensure that all values have been entered properly");
      console.log(error);
    }
  };

  render() {
    const { categoryArr, product } = this.state;
    console.log(product);
    let product1 = product[0] || {
      prodCode: "",
      img: "",
      title: "",
      ingredients: [],
      category: "",
      desc: [],
    };
    return (
      <React.Fragment>
        <Formik
          initialValues={{
            prodCode: product1.prodCode || "",
            img: product1.img || "",
            title: product1.title || "",
            ingredients: product1.ingredients || [],
            category: product1.category || "",
            desc: product1.desc || [],
          }}
          enableReinitialize={true}
          validationSchema={validateProductForm}
          onSubmit={(values) => {
            this.handleAdd(values);
            this.props.history.push("/products");
          }}
        >
          {({ values }) => (
            <Form>
              <div className="row">
                <div className="col-6">
                  <div className="form-group">
                    <label>Product Code</label>
                    <Field
                      name="prodCode"
                      type="text"
                      className="form-control"
                    />
                    <div className="text-danger">
                      <ErrorMessage name="prodCode" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Name</label>
                    <Field name="title" type="text" className="form-control" />
                    <div className="text-danger">
                      <ErrorMessage name="title" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Image URL</label>
                    <Field name="img" type="text" className="form-control" />
                    <div className="text-danger">
                      <ErrorMessage name="img" />
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <label>Category</label>
                      <Field
                        as="select"
                        name="category"
                        className="form-control"
                      >
                        <option value="">Choose grade</option>
                        {categoryArr.map((g) => (
                          <option value={g} key={g}>
                            {g}
                          </option>
                        ))}
                      </Field>
                      <div className="text-danger">
                        <ErrorMessage name="category" />
                      </div>
                    </div>
                  </div>
                  <FieldArray
                    name="desc"
                    render={(arrayHelpers) => (
                      <div>
                        <button
                          className="btn btn-secondary m-2"
                          type="button"
                          onClick={() => arrayHelpers.push("")}
                        >
                          Add Description
                        </button>
                        {values.desc &&
                          values.desc.map((d, index) => (
                            <div key={index} className="row mb-2">
                              <div className="col">
                                <div className="form-group">
                                  <Field
                                    type="text"
                                    name={`desc[${index}]`}
                                    className="form-control txt-sq1"
                                    placeholder={`Line ${index + 1}`}
                                  />
                                  <div className="text-danger">
                                    <ErrorMessage name={`desc[${index}]`} />
                                  </div>
                                </div>
                              </div>
                              <div className="col align-self-center">
                                <button
                                  className="btn btn-danger btn-sq"
                                  type="button"
                                  onClick={() => arrayHelpers.remove(index)}
                                >
                                  X
                                </button>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  />
                  <FieldArray
                    name="ingredients"
                    render={(arrayHelpers) => (
                      <div>
                        <button
                          className="btn btn-secondary m-2"
                          type="button"
                          onClick={() => arrayHelpers.push("")}
                        >
                          Add items shipped with product
                        </button>
                        {values.ingredients &&
                          values.ingredients.map((d, index) => (
                            <div key={index} className="row mb-2">
                              <div className="col">
                                <div className="form-group">
                                  <Field
                                    type="text"
                                    name={`ingredients[${index}].ingName`}
                                    className="form-control"
                                    placeholder="Item Name"
                                  />
                                  <div className="text-danger">
                                    <ErrorMessage
                                      name={`ingredients[${index}].ingName`}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col">
                                <div className="form-group">
                                  <Field
                                    type="text"
                                    name={`ingredients[${index}].qty`}
                                    className="form-control"
                                    placeholder="Quantity"
                                  />
                                  <div className="text-danger">
                                    <ErrorMessage
                                      name={`ingredients[${index}].qty`}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col align-self-center">
                                <button
                                  className="btn btn-danger btn-sq"
                                  type="button"
                                  onClick={() => arrayHelpers.remove(index)}
                                >
                                  X
                                </button>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  />
                  <button className="btn btn-success btn-sm m-2" type="submit">
                    {this.props.match.params.prodCode ? "Edit" : "Submit"}
                  </button>
                </div>
                <div className="col-6">
                  {values.img && (
                    <img
                      src={values.img || ""}
                      className="img-fluid mt-3 img-mr"
                      alt=""
                    />
                  )}
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </React.Fragment>
    );
  }
}
export default NewProduct;
